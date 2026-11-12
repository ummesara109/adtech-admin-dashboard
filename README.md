# AdTech Platform – Admin + Client portals (Node.js backend)

## Run in VS Code
1. Install Node.js 16 or newer (https://nodejs.org).
2. File > Open Folder... and choose this folder.
3. Open the terminal (Ctrl + `) and run:

       npm start

   (or press F5 and pick "Run AdTech server").
4. Open http://localhost:3000

No `npm install` is needed – the backend has zero dependencies.
The live map loads Leaflet and OpenStreetMap tiles from the internet, so keep your connection on.

## Demo logins
| Portal | Email | Password |
|---|---|---|
| Admin | admin@adtech.in | Admin@123 |
| Client | ads@abc.com | Client@123 |

Other admin users (password Admin@123): amit@adtech.in (Admin), priya@adtech.in (Manager), sneha@adtech.in (Support), rahul@adtech.in (Viewer – inactive).
Other clients (password Client@123): ads@techglobal.com, hello@futurebrands.com, ads@megamedia.com. ads@dreamads.com is "Pending" and cannot sign in until an admin approves it.
New users and advertisers get the password you type in the Add form.

## What is included
- Landing page: choose Admin or Client, then sign in.
- Admin portal: users, advertisers, drivers/partners, vehicles (Bengaluru areas), devices, campaigns (approve/reject), packages, live monitoring, analytics, billing (CSV export), support, audit logs, settings.
- Client portal: own dashboard, own campaigns (create / edit / delete while Pending), ad packages, own invoices, support tickets. The server only returns the client's own data.
- Click any row to open a details panel (linked campaigns, vehicle, driver, device, activity...).
- Roles: Viewer is read-only; only Super Admin and Admin can manage users; only Super Admin can reset data.
- Live monitoring: backend simulates GPS for online devices around their vehicle's area and the map polls every 3 seconds.

## Viewing a client's portal (admin)
The landing page shows a single Admin sign-in form. Clients are viewed by admins (see below).

After signing in as admin you can open any client's portal **without signing in as that client**:
- Management > **Advertisers**: click the eye icon on a row (or open the row and press "View client portal"), or
- Overview > **Client Logins**, or the **Client portal** button in the top bar.

The client's dashboard, campaigns, packages, billing and support open in **view-only mode**. Your admin name, role and session stay active the whole time (shown in the sidebar and a banner), and no client token is ever created. Press **Back to admin** to return. Each view is recorded in the Audit Logs.
**Client Logins** also lists every client's last login, total logins and a history of recent client sign-ins (time and IP).

## Connect real devices (live GPS)
Send this from a device or tracker; it replaces the simulation for that device:

    curl -X POST http://localhost:3000/api/device-location \
      -H "Content-Type: application/json" \
      -d '{"key":"device-secret","dev":"DEV-001","lat":12.9172,"lng":77.6228,"speed":24}'

Change the key with an environment variable: `DEVICE_KEY=mysecret npm start`.

## Backend API (JSON, Bearer token)
POST /api/login · GET /api/client-logins (admin) · GET /api/client-view/:clientId (admin, read-only) · GET /api/bootstrap · GET/POST /api/:collection · PUT/DELETE /api/:collection/:id · GET /api/live · PUT /api/settings · POST /api/reset
Collections: users, advertisers, partners, vehicles, devices, campaigns, inventory, billing, support.

## Data
Stored in `data/db.json` (created on first run). Passwords are hashed with scrypt; sessions are signed tokens valid for 12 hours.
Delete the `data` folder to start from fresh sample data. Use PORT=4000 to change the port.

## Files
- `server.js` – HTTP server, auth, REST API, live simulation, JSON storage
- `public/index.html`, `public/styles.css`, `public/app.js` – the front end
