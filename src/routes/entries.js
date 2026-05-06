'use strict';

const express = require('express');
const router = express.Router();
const { listEntries, createEntry, getEntryByDate, updateEntry } = require('../controllers/entryController');
const authMiddleware = require('../middleware/auth');

router.get('/entries', authMiddleware, listEntries);
router.post('/entries', authMiddleware, createEntry);
router.get('/entries/:date', authMiddleware, getEntryByDate);
router.put('/entries/:date', authMiddleware, updateEntry);

module.exports = router;
