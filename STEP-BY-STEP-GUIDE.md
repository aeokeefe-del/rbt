# STEP-BY-STEP-GUIDE.md — Rose Bud Thorn (rbt.)

A living setup guide. Written alongside the build, so every instruction here reflects what actually worked on this project.

---

## Part 1 — Back-end Setup

### Prerequisites

- **Node.js v22 or higher** — the project's `engines` field requires `>=22.0.0`. Check with `node -v`.
- **npm** — comes bundled with Node. Check with `npm -v`.
- **A MongoDB Atlas account** — free tier (M0) is sufficient.
- **Thunder Client** (VS Code extension) — for manually testing API routes without a browser.
- **Git** — to clone the repo.

---

### Clone the repo and install dependencies

```bash
git clone https://github.com/aeokeefe-del/rbt.git
cd rbt
npm install
```

This installs the server's dependencies (Express, Mongoose, bcryptjs, jsonwebtoken, etc.) defined in the root `package.json`. The Vue front-end has its own `package.json` inside `client/` — that gets installed separately (see Part 2).

---

### Configure the `.env` file

Create a file called `.env` in the **root** of the project (next to `package.json`). Never commit this file — it's already in `.gitignore`.

```
DATABASE_URL=
JWT_SECRET=
CLIENT_ORIGIN=
PORT=
```

**What each variable does:**

| Variable | What it is |
|---|---|
| `DATABASE_URL` | Your full MongoDB Atlas connection string. Found in Atlas → Clusters → Connect → Drivers. Looks like `mongodb+srv://username:password@cluster.mongodb.net/dbname` |
| `JWT_SECRET` | A long random string used to sign and verify JSON Web Tokens. Make it at least 32 characters. You can generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `CLIENT_ORIGIN` | The URL of the front-end during development: `http://localhost:5173`. In production, set this to your deployed front-end URL so CORS allows it. |
| `PORT` | The port the Express server listens on. Defaults to `3000` if not set. Railway sets this automatically in production, so you don't need to set it there. |

---

### Configure Claude Code for this project

If you used Claude Code (the AI coding assistant CLI) during development, create a `CLAUDE.md` file at the root of the project. This file gives Claude context about the project so it understands the codebase without re-explaining things every session.

A minimal `CLAUDE.md` for this project:

```markdown
# Rose Bud Thorn

Full-stack journaling app. Express + MongoDB backend in `src/`. Vue 3 + Vite frontend in `client/`.

## Key facts
- Server entry: `src/index.js`
- API routes: /api/auth (register/login), /api/entries (GET/POST/PUT)
- Auth: JWT via Authorization: Bearer header
- DB: Mongoose, connection string in DATABASE_URL env var
- Frontend proxy: Vite dev server proxies /api to localhost:3000
- Git commits: use --no-gpg-sign flag (signing not configured)
```

Claude Code reads this file at the start of each session. Keeping it updated means you spend less time re-explaining the project structure.

---

### Connect to MongoDB Atlas

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) and log in.
2. Create a free **M0 cluster** if you haven't already.
3. Under **Security → Database Access**, create a database user with a username and password.
4. Under **Security → Network Access**, add `0.0.0.0/0` to allow connections from anywhere (required for Railway deployment later).
5. Click **Connect** on your cluster → **Drivers** → copy the connection string.
6. Replace `<password>` in the string with your database user's password.
7. Paste the full string as the value of `DATABASE_URL` in your `.env`.

---

### Start the server and verify it's running

```bash
npm run server
```

You should see:
```
MongoDB connected
Server running on port 3000
```

To confirm the server is alive, open a browser or Thunder Client and hit:

```
GET http://localhost:3000/api/health
```

Expected response:
```json
{ "status": "ok" }
```

---

### Test routes in Thunder Client

Install the **Thunder Client** extension in VS Code (search "Thunder Client" in the Extensions panel).

**Register a new user:**
- Method: `POST`
- URL: `http://localhost:3000/api/auth/register`
- Body (JSON):
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "yourpassword"
}
```
- Expected: `201` with a JWT token in the response.

**Log in:**
- Method: `POST`
- URL: `http://localhost:3000/api/auth/login`
- Body (JSON): same email + password
- Expected: `200` with a JWT token. Copy this token.

**Create an entry (authenticated):**
- Method: `POST`
- URL: `http://localhost:3000/api/entries`
- Headers: `Authorization: Bearer <paste-token-here>`
- Body (JSON):
```json
{
  "rose": "Had a great coffee",
  "bud": "Looking forward to the weekend",
  "thorn": "Missed the bus",
  "adjective": "Calm",
  "color": { "name": "Crimson", "hex": "#DC143C" }
}
```
- Expected: `201` with the saved entry.

**Fetch entries:**
- Method: `GET`
- URL: `http://localhost:3000/api/entries?year=2026`
- Headers: `Authorization: Bearer <paste-token-here>`
- Expected: `200` with an array of entries.

---

## Part 2 — Front-end Setup

### The client directory

The Vue front-end lives in `client/`. It's a separate npm project — it has its own `package.json` and `node_modules`. You need to install its dependencies separately from the server.

```bash
npm install --prefix client
```

Or equivalently:
```bash
cd client
npm install
cd ..
```

---

### Environment variable: VITE_API_URL

During local development, you don't need a `VITE_API_URL` because Vite's dev server is configured to **proxy** all `/api` requests to the Express server on port 3000. This is set in `client/vite.config.js`:

```js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
},
```

This means `axios.get('/api/entries')` in the Vue code goes to `localhost:3000/api/entries` automatically during development — no environment variable needed locally.

In production, the built Vue files are served by Express as static files, so the frontend and backend share the same origin and no proxy configuration is needed.

---

### Run the dev server

To run the front-end and back-end together in one terminal:

```bash
npm run dev
```

This uses `concurrently` to start both:
- Express on `http://localhost:3000`
- Vite on `http://localhost:5173`

Open [http://localhost:5173](http://localhost:5173) in your browser. The app should load and API calls (login, register, entries) will be proxied through to the Express server.

---

### Verify the front-end connects to the back-end

1. Open [http://localhost:5173](http://localhost:5173).
2. Click **Sign Up** and create an account.
3. If registration succeeds and you're redirected to the Today page, the frontend is talking to the backend correctly.
4. Open browser DevTools → Network tab → look for `/api/auth/register` — it should show `201 Created`.

If you see network errors, confirm that `npm run server` (or `npm run dev`) is running and MongoDB is connected (check the terminal for "MongoDB connected").

---

## Part 3 — Deployment

This project deploys the **entire app — both back-end and front-end — to a single Railway service**. During the build step, Vite compiles the Vue app into static files, and Express serves them from `client/dist/`. There is no separate front-end hosting.

---

### Step-by-step: Deploy to Railway

1. Go to [railway.app](https://railway.app) and log in with GitHub.
2. Click **New Project** → **Deploy from GitHub repo**.
3. Select the `rbt` repository.
4. Railway will detect the `package.json` and auto-configure the build.
5. Before the first deploy succeeds, you must set environment variables (see below).

---

### Set environment variables in the Railway dashboard

In your Railway project → the service → **Variables** tab, add:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your MongoDB Atlas connection string (same as local `.env`) |
| `JWT_SECRET` | The same secret string you use locally |
| `CLIENT_ORIGIN` | The Railway-generated URL for your app (e.g. `https://rbt-production.up.railway.app`) — set this after first deploy |
| `NODE_ENV` | `production` |

Railway sets `PORT` automatically — do not set it manually.

---

### How the build works on Railway

Railway runs these two commands in sequence, as defined in `package.json`:

```
npm ci                                     ← installs server dependencies
npm run build                              ← runs: npm ci --prefix client && vite build
```

The `build` script installs the client's dependencies first (including Vite), then compiles the Vue app into `client/dist/`.

After the build, Railway starts the server with:
```
node src/index.js
```

---

### Serve the built front-end from Express

For the deployed app to work, Express must serve the compiled Vue files. Add the following to `src/index.js` **after** all API routes (this should already be present):

```js
const path = require('path');

// Serve built Vue app
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
```

This makes Express serve `client/dist/index.html` for any route that isn't an API route, which is required for Vue Router to work on page refresh.

---

### CORS configuration

The Express server uses CORS with an origin allowlist:

```js
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
```

In production on Railway, `CLIENT_ORIGIN` should be set to your Railway app URL. Because the frontend and backend are deployed to the same service and same domain, CORS is not strictly required between them — but it is needed if you ever call the API from a different origin (e.g. a mobile app or a staging URL).

---

### Link front-end to back-end (same-origin deployment)

Because both are on the same Railway service, the Vue app's API calls to `/api/...` automatically resolve to the same domain — no extra configuration needed. The Vite proxy only applies in local development and has no effect on the production build.

---

### Verify deployment

After Railway finishes deploying:

1. Open your Railway URL (e.g. `https://rbt-production.up.railway.app`).
2. The Vue app should load.
3. Register an account — if it succeeds, the database connection and auth are working.
4. Create a today entry — if the rose appears in the garden, the full stack is working end-to-end.
