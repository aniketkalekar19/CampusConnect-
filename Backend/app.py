"""CampusConnect REST API implemented with Flask."""
from copy import deepcopy
from datetime import datetime, timezone
from itertools import count
from pathlib import Path
import json
import time
import uuid

from flask import Flask, jsonify, request
from flask_cors import CORS
from database import db

app = Flask(__name__)
CORS(app)

with Path(__file__).with_name("data").joinpath("seed_data.json").open(encoding="utf-8") as seed_file:
    seed = json.load(seed_file)

events = deepcopy(seed["events"])
registrations = deepcopy(seed["registrations"])
initial_user = seed["user"]
registration_ids = count(1)


def json_response(payload, status=200):
    return jsonify(payload), status


def _event_from_row(row, registered_count=0):
    details = row.get("details") or {}
    timestamp = row.get("timestamp")
    raw_date = timestamp[:10] if isinstance(timestamp, str) and len(timestamp) >= 10 else ""
    return {
        **details,
        "id": row["id"],
        "title": row.get("title") or details.get("title", "Untitled event"),
        "capacity": row.get("capacity") if row.get("capacity") is not None else details.get("capacity", 0),
        "registeredCount": registered_count,
        "organizerId": row.get("organizer_id"),
        "rawDate": details.get("rawDate") or raw_date,
        "date": details.get("date") or raw_date,
        "time": details.get("time") or "",
        "category": details.get("category") or "Campus",
        "location": details.get("location") or "Campus",
        "organizer": details.get("organizer") or "Campus organizer",
        "image": details.get("image") or "",
        "price": details.get("price", 0),
        "isPaid": details.get("isPaid", False),
    }


def get_event(event_id):
    if db:
        rows = db.select("events", filters={"id": f"eq.{event_id}"}, limit=1)
        if not rows:
            return None
        event = rows[0]
        registrations = db.select("registration", columns="id", filters={"event_id": f"eq.{event_id}"})
        return _event_from_row(event, len(registrations))
    return next((event for event in events if event.get("id") == event_id), None)


def _registration_from_row(row, event=None):
    details = row.get("details") or {}
    event = event or get_event(row.get("event_id")) or {}
    user_rows = db.select("Users", columns="id,email,role", filters={"id": f"eq.{row.get('user_id')}"}, limit=1)
    user = user_rows[0] if user_rows else {}
    registration_id = row.get("id")
    return {
        **details,
        "id": registration_id,
        "registrationId": registration_id,
        "ticketId": details.get("ticketId") or f"TCK-CC-{str(registration_id)[-8:].upper()}",
        "eventId": row.get("event_id"),
        "eventTitle": event.get("title"),
        "category": event.get("category"),
        "date": event.get("date"),
        "time": event.get("time"),
        "location": event.get("location"),
        "userId": row.get("user_id"),
        "studentId": details.get("studentId") or user.get("id"),
        "attendeeEmail": details.get("attendeeEmail") or user.get("email"),
        "bookingDate": details.get("bookingDate") or row.get("createdAt"),
        "status": details.get("status") or "Confirmed",
        "image": details.get("image") or event.get("image"),
    }


def _resolve_user(email, role="student"):
    rows = db.select("Users", columns="id,email,role", filters={"email": f"eq.{email}"}, limit=1)
    if rows:
        return rows[0]
    return db.insert("Users", {"email": email, "role": role})


def error_response(message, status, **extra):
    return json_response({"success": False, "status": status, "error": message, **extra}, status)


@app.before_request
def log_request():
    request._started_at = time.perf_counter()


@app.after_request
def log_response(response):
    elapsed = (time.perf_counter() - getattr(request, "_started_at", time.perf_counter())) * 1000
    app.logger.info("[API] %s %s -> %s (%.0fms)", request.method, request.path, response.status_code, elapsed)
    return response


@app.get("/api")
def api_info():
    return jsonify({
        "name": "CampusConnect REST API",
        "version": "1.0.0",
        "endpoints": [
            {"method": "GET", "endpoint": "/api/events", "description": "Browse events."},
            {"method": "GET", "endpoint": "/api/events/{id}", "description": "Event details."},
            {"method": "POST", "endpoint": "/api/registrations", "description": "Create registration, 201 or 409."},
            {"method": "GET", "endpoint": "/api/me/registrations", "description": "Current user's registrations."},
            {"method": "GET", "endpoint": "/api/events/{id}/registrations", "description": "Attendee list."},
        ],
    })


@app.get("/")
def root():
    return jsonify({
        "name": "CampusConnect Flask API",
        "status": "ok",
        "message": "Backend is running.",
        "api": "/api",
        "health": "/api/health",
    })


@app.get("/api/health")
def health():
    database = "not_configured"
    if db:
        db.select("events", columns="id", limit=1)
        database = "connected"
    return jsonify({"status": "ok", "database": database,
                    "timestamp": datetime.now(timezone.utc).isoformat()})


@app.get("/api/events")
def list_events():
    if db:
        event_rows = db.select("events", order="timestamp.asc")
        registration_rows = db.select("registration", columns="event_id")
        counts = {}
        for registration in registration_rows:
            event_id = registration.get("event_id")
            counts[event_id] = counts.get(event_id, 0) + 1
        result = [_event_from_row(row, counts.get(row.get("id"), 0)) for row in event_rows]
    else:
        result = list(events)
    category = request.args.get("category")
    search = request.args.get("search", "").strip().lower()
    price_type = request.args.get("priceType", "").lower()
    if category and category.lower() != "all":
        result = [e for e in result if e.get("category", "").lower() == category.lower()]
    if price_type == "free":
        result = [e for e in result if not e.get("isPaid")]
    elif price_type == "paid":
        result = [e for e in result if e.get("isPaid")]
    if search:
        result = [e for e in result if any(search in str(e.get(field, "")).lower()
                  for field in ("title", "category", "location", "organizer"))]
    return jsonify({"success": True, "count": len(result), "data": result})


@app.get("/api/events/<event_id>")
def event_details(event_id):
    event = get_event(event_id)
    if event is None:
        return json_response({"success": False, "error": f'Event with ID "{event_id}" was not found.'}, 404)
    return jsonify({"success": True, "data": event})


@app.post("/api/registrations")
def create_registration():
    body = request.get_json(silent=True) or {}
    event_id = body.get("eventId")
    if not event_id:
        return json_response({"success": False, "error": 'Missing required field: "eventId".'}, 400)
    event = get_event(event_id)
    if event is None:
        return error_response(f'Event with ID "{event_id}" was not found.', 404)

    if db:
        email = (body.get("attendeeEmail") or initial_user.get("email") or "").strip().lower()
        attendee = _resolve_user(email)
        user_id = attendee["id"]
        duplicate = db.select("registration", columns="id", filters={
            "event_id": f"eq.{event_id}", "user_id": f"eq.{user_id}"
        }, limit=1)
        if duplicate:
            return error_response("Conflict: User is already registered for this event.", 409,
                                  code="ALREADY_REGISTERED", existingRegistrationId=duplicate[0]["id"])
        if event.get("registeredCount", 0) >= event.get("capacity", float("inf")):
            return error_response("Conflict: Event is at full capacity. No tickets available.", 409,
                                  code="CAPACITY_REACHED")
        details = {
            "studentId": body.get("studentId") or body.get("userId") or user_id,
            "attendeeName": body.get("attendeeName") or initial_user.get("name"),
            "attendeeEmail": email,
            "phone": body.get("phone", ""),
            "ticketType": body.get("ticketType") or ("Verified Student Pass" if event.get("isPaid") else "General Admission"),
            "price": body.get("price", event.get("price", 0)),
            "seat": body.get("seat") or "Gate Section A",
            "bookingDate": datetime.now().strftime("%b %d, %Y"),
            "status": "Confirmed",
            "image": event.get("image"),
        }
        row = db.insert("registration", {
            "user_id": user_id,
            "event_id": event_id,
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "details": details,
        })
        result = _registration_from_row(row, event)
        return json_response({"success": True, "status": 201,
                              "message": "Registration confirmed successfully.", "data": result}, 201)

    user_id = body.get("userId") or request.headers.get("x-user-id") or body.get("studentId") or initial_user["studentId"]
    email = body.get("attendeeEmail") or initial_user["email"]
    existing = next((r for r in registrations if r.get("eventId") == event_id and (
        r.get("userId") == user_id or r.get("studentId") == user_id or
        (email and r.get("attendeeEmail", "").lower() == email.lower())
    )), None)
    if existing:
        return error_response("Conflict: User is already registered for this event.", 409,
                              code="ALREADY_REGISTERED", existingRegistrationId=existing.get("registrationId", existing.get("id")))
    if event.get("registeredCount", 0) >= event.get("capacity", float("inf")):
        return error_response("Conflict: Event is at full capacity. No tickets available.", 409, code="CAPACITY_REACHED")

    now_id = f"reg-{int(time.time() * 1000)}-{next(registration_ids)}"
    new_registration = {
        "id": now_id, "registrationId": now_id,
        "ticketId": f"TCK-CC-{(int(time.time() * 1000) + next(registration_ids)) % 9000 + 1000}",
        "eventId": event["id"], "eventTitle": event.get("title"), "category": event.get("category"),
        "date": event.get("date"), "time": event.get("time"), "location": event.get("location"),
        "userId": user_id, "studentId": body.get("studentId") or user_id,
        "attendeeName": body.get("attendeeName") or initial_user.get("name"), "attendeeEmail": email,
        "phone": body.get("phone", ""),
        "ticketType": body.get("ticketType") or ("Verified Student Pass" if event.get("isPaid") else "General Admission"),
        "price": body.get("price", event.get("price", 0)), "seat": body.get("seat") or "Gate Section A",
        "bookingDate": datetime.now().strftime("%b %d, %Y"), "status": "Confirmed", "image": event.get("image"),
    }
    registrations.insert(0, new_registration)
    event["registeredCount"] = event.get("registeredCount", 0) + 1
    return json_response({"success": True, "status": 201, "message": "Registration confirmed successfully.", "data": new_registration}, 201)


@app.get("/api/me/registrations")
def my_registrations():
    user_id = request.headers.get("x-user-id") or request.args.get("userId") or initial_user["studentId"]
    if db:
        user = None
        try:
            uuid.UUID(str(user_id))
            rows = db.select("Users", columns="id,email,role", filters={"id": f"eq.{user_id}"}, limit=1)
            user = rows[0] if rows else None
        except ValueError:
            pass
        if user is None:
            email = request.headers.get("x-user-email") or request.args.get("email") or initial_user.get("email")
            rows = db.select("Users", columns="id,email,role", filters={"email": f"eq.{email}"}, limit=1)
            user = rows[0] if rows else None
        if user is None:
            return jsonify({"success": True, "status": 200, "userId": user_id, "count": 0, "data": []})
        rows = db.select("registration", filters={"user_id": f"eq.{user['id']}"}, order="createdAt.desc")
        result = [_registration_from_row(row) for row in rows]
        return jsonify({"success": True, "status": 200, "userId": user["id"], "count": len(result), "data": result})
    result = [r for r in registrations if r.get("userId") == user_id or r.get("studentId") == user_id]
    return jsonify({"success": True, "status": 200, "userId": user_id, "count": len(result), "data": result})


@app.get("/api/events/<event_id>/registrations")
def event_registrations(event_id):
    event = get_event(event_id)
    if event is None:
        return error_response(f'Event with ID "{event_id}" was not found.', 404)
    if db:
        rows = db.select("registration", filters={"event_id": f"eq.{event_id}"}, order="createdAt.asc")
        attendees = [_registration_from_row(row, event) for row in rows]
    else:
        attendees = [r for r in registrations if r.get("eventId") == event_id]
    data = {"eventId": event["id"], "eventTitle": event.get("title"), "organizer": event.get("organizer"),
            "totalCapacity": event.get("capacity"), "registeredCount": event.get("registeredCount"),
            "attendeeCount": len(attendees), "attendees": attendees}
    return jsonify({"success": True, "status": 200, "data": data})


@app.post("/api/events")
def add_event():
    body = request.get_json(silent=True) or {}
    if not body:
        return json_response({"success": False, "error": "Event data is required."}, 400)
    new_event = {**body, "id": body.get("id") or f"evt-{int(time.time() * 1000)}",
                 "organizerId": body.get("organizerId") or initial_user["studentId"],
                 "registeredCount": body.get("registeredCount") or 0}
    if db:
        organizer_id = body.get("organizerId")
        try:
            organizer_id = str(uuid.UUID(str(organizer_id))) if organizer_id else None
        except ValueError:
            organizer_id = None
        timestamp = body.get("rawDate") or body.get("timestamp")
        if not timestamp:
            timestamp = datetime.now(timezone.utc).isoformat()
        elif len(str(timestamp)) == 10:
            timestamp = f"{timestamp}T00:00:00+00:00"
        details = {key: value for key, value in body.items()
                   if key not in {"title", "capacity", "organizerId", "registeredCount", "id", "timestamp"}}
        row = db.insert("events", {
            "title": body.get("title", "Untitled event"),
            "capacity": body.get("capacity", 0),
            "organizer_id": organizer_id,
            "timestamp": timestamp,
            "details": details,
        })
        created = _event_from_row(row, 0)
        return json_response({"success": True, "message": "Event created successfully", "data": created}, 201)
    events.insert(0, new_event)
    return json_response({"success": True, "message": "Event created successfully", "data": new_event}, 201)


@app.delete("/api/registrations/<registration_id>")
def cancel_registration(registration_id):
    if db:
        try:
            registration_id = str(uuid.UUID(registration_id))
            rows = db.select("registration", filters={"id": f"eq.{registration_id}"}, limit=1)
        except ValueError:
            rows = []
        if not rows:
            all_rows = db.select("registration")
            rows = [row for row in all_rows
                    if (row.get("details") or {}).get("ticketId") == registration_id
                    or f"TCK-CC-{str(row.get('id', ''))[-8:].upper()}" == registration_id]
        if not rows:
            return error_response(f'Registration with ID "{registration_id}" not found.', 404)
        db.delete("registration", {"id": f"eq.{rows[0]['id']}"})
        return jsonify({"success": True, "message": "Registration cancelled successfully."})
    index = next((i for i, r in enumerate(registrations) if registration_id in
                  (r.get("id"), r.get("ticketId"), r.get("registrationId"))), None)
    if index is None:
        return error_response(f'Registration with ID "{registration_id}" not found.', 404)
    removed = registrations.pop(index)
    event = get_event(removed.get("eventId"))
    if event and event.get("registeredCount", 0) > 0:
        event["registeredCount"] -= 1
    return jsonify({"success": True, "message": "Registration cancelled successfully."})


@app.errorhandler(404)
def not_found(_error):
    return json_response({"success": False, "status": 404, "error": f"Cannot {request.method} {request.path}"}, 404)


@app.errorhandler(RuntimeError)
def database_error(error):
    app.logger.exception("Database request failed")
    return json_response({"success": False, "status": 503, "error": str(error)}, 503)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(__import__("os").environ.get("PORT", 5000)), debug=False)
