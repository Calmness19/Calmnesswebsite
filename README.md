# Time Management Achievers (TMA)

This repository holds early scaffolding for the **TMA** project described in SPEC-001.  

## Backend

- Minimal Node HTTP server exposing `/api/tasks`.
- Supports idempotent `POST /api/tasks` where repeating the same `id` returns existing data.
- `GET /api/tasks` lists stored tasks (in memory for now).

Run tests:

```bash
cd backend
npm test
```

## Next Steps

- Expand REST endpoints for projects, goals, sessions and more per SPEC-001.
- Add persistence via Supabase/Postgres.
- Implement PWA front-end with planning and Pomodoro timer.
