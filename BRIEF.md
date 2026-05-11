# BRIEF.md — Project Proposal

## Project Name
**Rose Bud Thorn** *(rbt.)*

---

## The Problem It Solves
Journaling consistently is hard — open-ended prompts lead to blank pages. Rose Bud Thorn gives people a gentle, structured daily reflection practice: one highlight, one hope, one challenge. Over a year, those small entries become a visual garden they can look back on.

---

## Core Features
- **Daily entry form** — three short prompts (Rose, Bud, Thorn) plus a mood color and adjective that together generate a unique illustrated rose
- **Personal garden view** — a full year displayed as a grid of roses, one per day, colored and shaped by each entry's choices
- **Entry detail view** — tap any rose to read back the original reflection, with the date and rose visualization
- **User accounts** — private gardens behind JWT authentication so each user's data stays their own
- **One entry per day enforcement** — the app prevents duplicate entries and allows editing the current day's entry up until midnight

---

## Data Model

### `users`
| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `username` | String | unique |
| `email` | String | unique |
| `password` | String | bcrypt hash |
| `createdAt` | Date | |

### `entries`
| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `userId` | ObjectId | ref → users |
| `date` | String | `YYYY-MM-DD`, unique per user |
| `rose` | String | highlight of the day |
| `bud` | String | something to look forward to |
| `thorn` | String | a challenge faced |
| `adjective` | String | mood word (from preset list or custom) |
| `customAdjective` | String | populated when adjective === "Other" |
| `color` | Object | `{ name: String, hex: String }` |
| `createdAt` | Date | |

*Unique compound index on `{ userId, date }`.*

---

## API Endpoint Table

### Auth
| Method | Path | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Create a new user account, return JWT |
| `POST` | `/api/auth/login` | Validate credentials, return JWT |

### Entries
| Method | Path | Description |
|---|---|---|
| `GET` | `/api/entries` | Fetch entries — accepts `?year=`, `?month=`, or `?current=1` for today's entry |
| `POST` | `/api/entries` | Create today's entry (409 if one already exists) |
| `PUT` | `/api/entries` | Update today's entry (replaces rose/bud/thorn/color/adjective) |

---

## Authentication
**Yes.** Each garden is private and personal — authentication ensures users can only read and write their own entries, and keeps the daily reflection data secure.
