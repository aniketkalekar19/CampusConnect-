-- Extend the existing CampusConnect schema for the Flask event portal.
-- Event and ticket-specific fields stay in JSONB so existing columns remain stable.

ALTER TABLE public.events
  DROP CONSTRAINT IF EXISTS events_organizer_id_fkey;

ALTER TABLE public.events
  ALTER COLUMN organizer_id DROP NOT NULL,
  ALTER COLUMN organizer_id DROP DEFAULT,
  ADD COLUMN IF NOT EXISTS details jsonb NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE public.events
  ADD CONSTRAINT events_organizer_id_fkey
  FOREIGN KEY (organizer_id) REFERENCES public."Users" (id) ON DELETE SET NULL;

ALTER TABLE public.registration
  ALTER COLUMN user_id DROP DEFAULT,
  ALTER COLUMN event_id DROP DEFAULT,
  ADD COLUMN IF NOT EXISTS details jsonb NOT NULL DEFAULT '{}'::jsonb;

CREATE UNIQUE INDEX IF NOT EXISTS registration_event_user_unique
  ON public.registration (event_id, user_id);
