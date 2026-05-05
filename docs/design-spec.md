# Rose Bud Thorn — Design Specification

## Concept

A mental health journaling web app based on the "Rose, Bud, Thorn" daily reflection framework. Each day a user logs one entry with three reflection prompts, picks a color and adjective to represent the day, and a unique rose flower SVG is generated to represent that entry. Roses accumulate into a "garden" mosaic, giving users a visual history of how they've felt over time.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vue 3 + Vite |
| State management | Pinia |
| UI component library | Vuetify 3 |
| Backend | Express.js (CommonJS) |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT (jsonwebtoken + bcrypt) |
| Deployment | Railway |

---

## Core Features

### Daily Entry
- One entry per user per calendar day
- Fields:
  - **Color** — curated palette of 17 colors (see below), user picks one to represent the day
  - **Adjective** — dropdown of 12 preset options + "Other" free-text field
  - **Rose** — text box: something good that happened today
  - **Bud** — text box: something you are looking forward to
  - **Thorn** — text box: something difficult or bad that happened today
- Save button persists the entry to MongoDB
- Entry can be edited on the same day it was created; read-only after

### Rose Generation
- A unique SVG rose is generated client-side from the entry's color and adjective
- The SVG parameters (not a rendered image) are stored in the entry document so the rose can be re-rendered consistently
- Visual variation driven by adjective (e.g. petal count, shape, openness)
- Color drives petal fill color

### Garden View
- Displays all roses for the current calendar year as a mosaic grid
- Each cell is the generated SVG rose for that day's entry
- Days with no entry are shown as empty/faded placeholders
- Year selector to view previous years' gardens
- Each new calendar year starts a fresh garden; all past gardens are preserved

### Stretch Goals (post-MVP)
- Monthly "bouquet" — a curated sub-view grouping the month's roses
- Mood trend visualizations (adjective frequency over time)
- Entry streaks

---

## Color Palette (17)

| Name | Hex |
|---|---|
| Crimson | #DC143C |
| Coral | #FF6B6B |
| Peach | #FFAB76 |
| Golden | #FFD700 |
| Sunshine | #FFF176 |
| Mint | #98FF98 |
| Forest | #228B22 |
| Sky | #87CEEB |
| Ocean | #006994 |
| Lavender | #967BB6 |
| Violet | #8B00FF |
| Dusty Rose | #DCAE96 |
| Mauve | #E0B0FF |
| Ivory | #FFFFF0 |
| Warm Orange | #FF8C00 |
| Teal | #008080 |
| Soft Pink | #FFB6C1 |

---

## Adjective Options (12 + Other)

Joyful, Calm, Grateful, Hopeful, Excited, Proud, Content, Anxious, Stressed, Tired, Sad, Overwhelmed, Other (free text)

---

## Data Models

### User
```
{
  _id: ObjectId,
  email: String (unique, required),
  passwordHash: String (required),
  createdAt: Date
}
```

### Entry
```
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  date: String (YYYY-MM-DD, required),
  color: { name: String, hex: String },
  adjective: String,
  customAdjective: String (only if adjective === 'Other'),
  rose: String,
  bud: String,
  thorn: String,
  roseParams: Object (SVG generation params, derived from color + adjective),
  createdAt: Date,
  updatedAt: Date
}
```
Compound unique index on `(userId, date)` — one entry per user per day.

---

## API Routes

### Auth
| Method | Route | Description |
|---|---|---|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Login, returns JWT |
| GET | /api/auth/me | Get current user (protected) |

### Entries
| Method | Route | Description |
|---|---|---|
| GET | /api/entries | Get entries (query: year, month) |
| POST | /api/entries | Create today's entry |
| GET | /api/entries/:date | Get entry by date (YYYY-MM-DD) |
| PUT | /api/entries/:date | Update entry (same-day only) |

---

## Frontend Views

| View | Route | Description |
|---|---|---|
| Login | /login | Email + password login form |
| Register | /register | Account creation form |
| Today | / | Daily entry form (redirects to /garden if already saved) |
| Garden | /garden | Yearly mosaic of roses |
| Past Entry | /entry/:date | Read-only view of a past entry + its rose |

---

## Project Structure

```
rose_bud_thorn/
├── docs/
│   ├── design-spec.md
│   └── wireframe.png
├── src/                    ← Express backend (CommonJS)
│   ├── index.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── entryController.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── entries.js
│   ├── middleware/
│   │   └── auth.js         ← JWT verification middleware
│   ├── models/
│   │   ├── User.js
│   │   └── Entry.js
│   └── utils/
│       └── db.js           ← MongoDB connection
├── client/                 ← Vue/Vite frontend
│   ├── src/
│   │   ├── main.js
│   │   ├── App.vue
│   │   ├── constants/
│   │   │   └── palette.js  ← colors + adjectives
│   │   ├── router/
│   │   │   └── index.js
│   │   ├── stores/
│   │   │   ├── auth.js
│   │   │   └── entries.js
│   │   ├── views/
│   │   │   ├── LoginView.vue
│   │   │   ├── RegisterView.vue
│   │   │   ├── TodayView.vue
│   │   │   ├── GardenView.vue
│   │   │   └── EntryView.vue
│   │   └── components/
│   │       ├── RoseCanvas.vue    ← SVG rose generator
│   │       ├── ColorPicker.vue
│   │       ├── AdjectivePicker.vue
│   │       └── GardenGrid.vue
│   ├── index.html
│   └── vite.config.js
├── .env.example
├── .env                    ← gitignored
├── .gitignore
├── CLAUDE.md
└── package.json
```
