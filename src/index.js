'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./utils/db');
const authMiddleware = require('./middleware/auth');
const { getEntries, createEntry, updateEntry } = require('./controllers/entryController');

const app = express();

const allowedOrigins = [
  process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  'https://aeokeefe-del.github.io',
];
app.use(cors({ origin: allowedOrigins }));
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
app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => { console.error(err); process.exit(1); });
