'use strict';

const express = require('express');
const router = express.Router();
const { listEntries, createEntry, getEntryByDate, updateEntry } = require('../controllers/entryController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', listEntries);
router.post('/', createEntry);
router.get('/:date', getEntryByDate);
router.put('/:date', updateEntry);

module.exports = router;
