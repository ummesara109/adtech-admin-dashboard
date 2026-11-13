# Vercel deploy (required settings)

Login fails with `NOT_FOUND` when Vercel only publishes the static UI and skips `/api`.

## Project settings (must match)

In Vercel → Project → **Settings → General**:

| Setting | Value |
| --- | --- |
| **Root Directory** | *empty* (repository root) — **not** `public` |
| **Framework Preset** | Other |
| **Build Command** | leave empty |
| **Output Directory** | leave empty — **not** `public` |
| **Install Command** | `npm install` (default) |

In **Settings → Environment Variables** (Production):

- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY` (or `SUPABASE_SERVICE_ROLE_KEY`)
- optional: `AUTH_SECRET`, `DEVICE_KEY`

Then **Deployments → … → Redeploy**.

## Verify

1. Open `https://YOUR-APP.vercel.app/` — login page
2. Open `https://YOUR-APP.vercel.app/api` — should **not** be Vercel NOT_FOUND HTML
3. Sign in: `admin@adtech.in` / `Admin@123`
