"""Small synchronous Supabase Data API client for the Flask backend."""
from __future__ import annotations

import json
import os
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen


def _load_backend_env():
    """Load simple KEY=value entries from Backend/.env without another dependency."""
    env_file = Path(__file__).with_name(".env")
    if not env_file.exists():
        return
    for line in env_file.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        name, value = line.split("=", 1)
        os.environ.setdefault(name.strip(), value.strip().strip("\"'"))


_load_backend_env()


class SupabaseREST:
    def __init__(self, url: str, key: str):
        self.base_url = url.rstrip("/") + "/rest/v1"
        self.key = key

    def request(self, table: str, method: str = "GET", *, params=None, body=None, prefer=None):
        path = quote(table, safe="")
        query = "?" + urlencode(params or {}) if params else ""
        data = None if body is None else json.dumps(body).encode("utf-8")
        headers = {
            "apikey": self.key,
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Accept-Profile": "public",
            "Content-Profile": "public",
        }
        # New Supabase API keys (sb_publishable_ / sb_secret_) are opaque
        # keys, not JWTs. PostgREST rejects them in Authorization: Bearer;
        # the apikey header alone is sufficient for the gateway to authorize
        # the request and provide its internal role JWT. Legacy anon and
        # service_role keys are JWTs and still need the Authorization header.
        if not self.key.startswith("sb_"):
            headers["Authorization"] = f"Bearer {self.key}"
        if prefer:
            headers["Prefer"] = prefer
        req = Request(f"{self.base_url}/{path}{query}", data=data, headers=headers, method=method)
        try:
            with urlopen(req, timeout=15) as response:
                payload = response.read()
                return json.loads(payload) if payload else []
        except HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="replace")
            raise RuntimeError(f"Supabase Data API returned {exc.code}: {detail}") from exc
        except (URLError, TimeoutError) as exc:
            raise RuntimeError(f"Could not reach Supabase Data API: {exc}") from exc

    def select(self, table: str, *, columns="*", filters=None, order=None, limit=None):
        params = {"select": columns}
        params.update(filters or {})
        if order:
            params["order"] = order
        if limit is not None:
            params["limit"] = str(limit)
        return self.request(table, params=params)

    def insert(self, table: str, row: dict, *, upsert=False, on_conflict=None):
        params = {"on_conflict": on_conflict} if on_conflict else None
        prefer = "return=representation"
        if upsert:
            prefer += ",resolution=merge-duplicates"
        rows = self.request(table, "POST", params=params, body=row, prefer=prefer)
        return rows[0] if rows else None

    def delete(self, table: str, filters: dict):
        return self.request(table, "DELETE", params=filters, prefer="return=representation")


url = os.environ.get("SUPABASE_URL", "").strip()
key = os.environ.get("SUPABASE_KEY", "").strip()
db = SupabaseREST(url, key) if url and key else None
