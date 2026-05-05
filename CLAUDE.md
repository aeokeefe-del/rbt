# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**rose_bud_thorn** is a full-stack mental health journaling web app based on the "Rose, Bud, Thorn" daily reflection framework. Users log daily entries, pick a color and adjective to represent their day, and a unique SVG rose is generated and saved to a yearly "garden" mosaic.

See `docs/design-spec.md` for full product and architecture details.

The GitHub repo is [aeokeefe-del/rbt](https://github.com/aeokeefe-del/rbt).

## Tech Stack

- **Backend**: Express.js, CommonJS (`require`/`module.exports` — never use `import`/`export` in backend files)
- **Database**: MongoDB via Mongoose
- **Auth**: JWT (jsonwebtoken + bcrypt)
- **Frontend**: Vue 3 + Vite + Vuetify 3 + Pinia (in `client/`)
- **Deployment**: Railway

## Architecture

```
rose_bud_thorn/
├── src/          ← Express backend (CommonJS)
│   ├── index.js
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   └── utils/
├── client/       ← Vue/Vite frontend
│   └── src/
│       ├── views/
│       ├── components/
│       ├── stores/
│       ├── router/
│       └── constants/
└── docs/
    └── design-spec.md
```

## Environment

Copy `.env.example` to `.env` and fill in values. Never commit `.env`.

## Workflow Rules

1. **Plan before code** — always write and present a numbered implementation plan before writing any code. Wait for approval.
2. **Ask before installing packages** — state the package name, why it's needed, and whether the Node stdlib could handle it instead. Wait for approval before running `npm install`.
3. **Phase by phase** — implement one phase at a time, stop and wait for review after each phase.
4. **Test as you go** — run `npm test` before every commit. Write tests alongside features.
5. **Commit frequently** — after every new route, middleware, model, or passing test.
6. **CommonJS only** on the backend — never use ES module syntax (`import`/`export`) in `src/`.
7. **No undocumented env vars** — any new environment variable must be added to `.env.example` immediately.

## Commands

See @package.json for all dependencies and available scripts.
