# ThinkBoard

ThinkBoard-MERN is a full-stack web application built on the MERN stack, which includes MongoDB, Express.js, React.js, and Node.js. The application aims to provide users with a collaborative platform for brainstorming and sharing ideas in a user-friendly interface.

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite 7, Tailwind CSS 3, DaisyUI 4 (forest theme) |
| Backend | Node.js, Express 4, Mongoose 8 |
| Database | MongoDB (via Mongoose) |
| Rate Limiting | Upstash Redis + `@upstash/ratelimit` (sliding window, 100 req/60s) |
| HTTP Client | Axios |
| Routing | React Router 7 |
| Notifications | react-hot-toast |
| Icons | lucide-react |

---

## Project Structure

```
/
├── backend/
│   └── src/
│       ├── config/
│       │   ├── db.js           # Mongoose connection
│       │   └── upstash.js      # Redis rate limiter config
│       ├── controllers/
│       │   └── notesController.js  # CRUD logic
│       ├── middleware/
│       │   └── rateLimiter.js  # Rate limit middleware
│       ├── models/
│       │   └── Note.js         # title + content + timestamps
│       ├── routes/
│       │   └── notesRoutes.js  # /api/notes REST routes
│       └── server.js           # Entry point, serves frontend in prod
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── NoteCard.jsx
│       │   ├── NotesNotFound.jsx
│       │   └── RateLimitedUI.jsx
│       ├── lib/
│       │   ├── axios.js        # Base URL switches dev/prod automatically
│       │   └── utils.js        # formatDate helper
│       ├── pages/
│       │   ├── HomePage.jsx
│       │   ├── CreatePage.jsx
│       │   └── NoteDetailPage.jsx
│       └── App.jsx
│
└── package.json                # Root build + start scripts
```

---

## API

Base path: `/api/notes`

| Method | Route | Description |
|---|---|---|
| GET | `/` | All notes, sorted newest first |
| GET | `/:id` | Single note by ID |
| POST | `/` | Create note (`title`, `content` required) |
| PUT | `/:id` | Update note |
| DELETE | `/:id` | Delete note |

All routes go through the rate limiter middleware. Exceeds quota → 429.

---

## Data Model

```js
// Note
{
  title:     String  // required
  content:   String  // required
  createdAt: Date    // auto
  updatedAt: Date    // auto
}
```

---

## Known Issues / Bugs

- `deleteNote` controller: condition checks `if (!deleteNote)` instead of `if (!deletedNote)`. The function reference is always truthy, so 404s on missing notes never fire.
- `db.js`: imports `mongo` from mongoose but never uses it.
- Rate limiter uses a single static key `"my-rate-limit"` for all requests — this is global, not per-user or per-IP.

---

## Setup

### Prerequisites

- Node.js ≥ 20
- MongoDB instance (local or Atlas)
- Upstash Redis account (for rate limiting)

### Environment Variables

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
PORT=5001                # optional, defaults to 5001
NODE_ENV=development
```

### Install & Run (Development)

```bash
# Backend
cd backend
npm install
npm run dev        # nodemon, hot reload

# Frontend (separate terminal)
cd frontend
npm install
npm run dev        # Vite dev server at localhost:5173
```

Backend runs on `http://localhost:5001`.  
Frontend proxies API calls to `http://localhost:5001/api` in dev mode.

### Build & Run (Production)

```bash
# From root
npm run build      # installs deps + builds frontend into frontend/dist
npm start          # starts backend, which serves the built frontend statically
```

In production, the Express server serves `frontend/dist` and handles all routes with `index.html`. No separate frontend server needed.

---

## Rate Limiting

Uses Upstash Redis with a sliding window of **100 requests per 60 seconds** across all clients (single global key). When the limit is hit, the API returns `429` and the UI renders a `RateLimitedUI` component instead of notes.

---

## Frontend Notes

- API base URL is dynamically set: `http://localhost:5001/api` in dev, `/api` in production.
- Theme is DaisyUI `forest`.
- Background uses a radial gradient (`#000` → `#00FF9D40`) defined inline in `App.jsx`.
- Note cards have a `#00FF9D` top border as the only brand accent.
- Deleting a note from the card list uses optimistic UI — filters state before any server confirmation of success.
