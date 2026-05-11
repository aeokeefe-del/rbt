'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./utils/db');
const authMiddleware = require('./middleware/auth');
const { getEntries, createEntry, updateEntry } = require('./controllers/entryController');

const app = express();

const ALLOWED_ORIGINS = new Set([
  'http://localhost:5173',
  'https://aeokeefe-del.github.io',
  process.env.CLIENT_ORIGIN,
].filter(Boolean));

const corsOptions = {
  origin: (origin, cb) => cb(null, !origin || ALLOWED_ORIGINS.has(origin)),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('/{*path}', cors(corsOptions));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.get('/api/entries', authMiddleware, getEntries);
app.post('/api/entries', authMiddleware, createEntry);
app.put('/api/entries', authMiddleware, updateEntry);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Serve built Vue frontend
const path = require('path');
const dist = path.join(__dirname, '../client/dist');
app.use(express.static(dist));
app.get('/{*path}', (_req, res) => res.sendFile(path.join(dist, 'index.html')));

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => { console.error(err); process.exit(1); });
