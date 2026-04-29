# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**rose_bud_thorn** is a Node.js backend project (CommonJS) in early scaffolding stage. No framework or dependencies have been installed yet. The GitHub repo is [aeokeefe-del/rbt](https://github.com/aeokeefe-del/rbt).

## Architecture

MVC-style layout under `src/`:
- `src/index.js` — main entry point
- `src/controllers/` — request handlers
- `src/routes/` — route definitions
- `src/middleware/` — Express (or similar) middleware
- `src/utils/` — shared utilities

## Environment

Copy `.env.example` to `.env` and fill in values:
- `PORT` — server port (default 3000)
- `NODE_ENV` — environment (development/production)
- `DATABASE_URL` — database connection string
- `API_KEY` — external API key

## Commands

No build or test tooling is configured yet. Once dependencies are added:

```bash
node src/index.js   # run the server
npm test            # run tests (not yet configured)
```
