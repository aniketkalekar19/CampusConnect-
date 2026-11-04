# CampusConnect Flask API

## Run

From the `Backend` directory, install the Python dependencies and start Flask:

```powershell
python -m pip install -r requirements.txt
python app.py
```

The API listens on `http://localhost:5000` by default. Set the `PORT` environment variable to change the port.

## Deploy

The repository includes a root `Procfile` for platforms that use Procfile-based Python deployments. Set the project root to the repository root, use `pip install -r Backend/requirements.txt` as the build command, and use the Procfile web command as the start command. Configure `SUPABASE_URL` and `SUPABASE_KEY` in the hosting provider's environment settings; the local `.env` file is not deployed. Use a current supported Python 3 release.

## Supabase database

The backend uses the Supabase Data API when `SUPABASE_URL` and `SUPABASE_KEY` are configured. Copy `.env.example` to `.env`, then replace the key with the project's publishable key. `.env` is ignored by Git. Do not use a service-role or secret key here.

Apply `../supabase/migrations/20261104000100_connect_campus_events.sql` to the Supabase project before starting the database-backed API. It adds JSON details for event and registration data, and fixes the organizer foreign key to reference `Users`. The API stores event and ticket-specific fields in those JSON columns while keeping IDs and relationships in regular columns.

When Supabase is configured, API reads and writes use the database; the seed JSON is used only when database credentials are not configured. The project currently has no event or registration rows, so the database-backed event list will be empty until events are added.

The API deliberately has no login or authorization flow. Supabase currently has Row Level Security disabled on the public tables, which exposes those tables to anyone holding a publishable key. The key is not secret, so enable suitable database protections before using real attendee data.

## API methods

- `GET /api/events` — browse events; optional `category`, `search`, and `priceType` filters.
- `GET /api/events/<id>` — event details.
- `POST /api/registrations` — create a registration; returns `201` or `409` for duplicates/full events.
- `GET /api/me/registrations` — registrations for `x-user-id` or `userId` (defaults to the sample user).
- `GET /api/events/<id>/registrations` — attendee list for an event.

There is no authentication or authorization in this API.
