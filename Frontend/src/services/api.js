import { INITIAL_USER } from '../data/mockData';

const DEFAULT_USER_ID = INITIAL_USER.studentId || 'STU-2026-7829';
const DEFAULT_USER_EMAIL = INITIAL_USER.email || '';

async function readJson(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

export async function fetchEvents({ category, search, priceType } = {}) {
  const params = new URLSearchParams();
  if (category && category.toLowerCase() !== 'all') params.set('category', category);
  if (search?.trim()) params.set('search', search.trim());
  if (priceType && priceType.toLowerCase() !== 'all') params.set('priceType', priceType);

  const response = await fetch(`/api/events?${params.toString()}`, {
    headers: { Accept: 'application/json' }
  });
  const result = await readJson(response);
  if (!response.ok) throw new Error(result.error || 'Unable to load events.');
  return result.data || [];
}

export async function fetchEventById(eventId) {
  const response = await fetch(`/api/events/${encodeURIComponent(eventId)}`, {
    headers: { Accept: 'application/json' }
  });
  const result = await readJson(response);
  if (response.status === 404) return { status: 404, error: result.error || 'Event not found.' };
  if (!response.ok) throw new Error(result.error || 'Unable to load event details.');
  return { status: response.status, data: result.data };
}

export async function createEvent(eventPayload) {
  const response = await fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(eventPayload)
  });
  const result = await readJson(response);
  if (!response.ok) throw new Error(result.error || 'Unable to create event.');
  return result.data;
}

export async function createRegistration(registrationPayload) {
  try {
    const response = await fetch('/api/registrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...registrationPayload,
        userId: registrationPayload.userId || DEFAULT_USER_ID,
        attendeeEmail: registrationPayload.attendeeEmail || DEFAULT_USER_EMAIL
      })
    });
    const result = await readJson(response);
    if (response.status === 201) return { status: 201, success: true, data: result.data };
    return {
      status: response.status,
      success: false,
      error: result.error || 'Unable to complete registration.',
      code: result.code
    };
  } catch {
    return { status: 0, success: false, error: 'The backend is unavailable. Registration was not saved.' };
  }
}

export async function fetchMyRegistrations(userId = DEFAULT_USER_ID) {
  try {
    const response = await fetch(`/api/me/registrations?userId=${encodeURIComponent(userId)}`, {
      headers: {
        Accept: 'application/json',
        'x-user-id': userId,
        'x-user-email': DEFAULT_USER_EMAIL
      }
    });
    const result = await readJson(response);
    if (!response.ok) return { status: response.status, data: [], error: result.error };
    return { status: 200, data: result.data || [] };
  } catch {
    return { status: 0, data: [], error: 'The backend is unavailable.' };
  }
}

export async function fetchEventAttendees(eventId, requesterUserId = DEFAULT_USER_ID) {
  try {
    const response = await fetch(`/api/events/${encodeURIComponent(eventId)}/registrations`, {
      headers: { Accept: 'application/json', 'x-user-id': requesterUserId }
    });
    const result = await readJson(response);
    if (response.ok) return { status: 200, success: true, data: result.data };
    return { status: response.status, success: false, error: result.error || 'Unable to load attendees.' };
  } catch {
    return { status: 0, success: false, error: 'The backend is unavailable.' };
  }
}

export async function deleteRegistration(ticketId) {
  try {
    const response = await fetch(`/api/registrations/${encodeURIComponent(ticketId)}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json' }
    });
    return response.ok;
  } catch {
    return false;
  }
}
