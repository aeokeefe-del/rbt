'use strict';

const Entry = require('../models/Entry');

async function listEntries(req, res) {
  try {
    const { year, month } = req.query;
    const filter = { userId: req.user.id };

    if (year && month) {
      const pad = String(month).padStart(2, '0');
      filter.date = { $regex: `^${year}-${pad}-` };
    } else if (year) {
      filter.date = { $regex: `^${year}-` };
    }

    const entries = await Entry.find(filter).sort({ date: 1 });
    res.json({ entries });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

async function createEntry(req, res) {
  try {
    const { date, color, adjective, customAdjective, rose, bud, thorn, roseParams } = req.body;
    if (!date || !color || !adjective) {
      return res.status(400).json({ error: 'date, color, and adjective are required' });
    }

    const entry = await Entry.create({
      userId: req.user.id,
      date,
      color,
      adjective,
      customAdjective: customAdjective || '',
      rose: rose || '',
      bud: bud || '',
      thorn: thorn || '',
      roseParams: roseParams || {},
    });

    res.status(201).json({ entry });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Entry already exists for this date' });
    res.status(500).json({ error: 'Server error' });
  }
}

async function getEntryByDate(req, res) {
  try {
    const entry = await Entry.findOne({ userId: req.user.id, date: req.params.date });
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.json({ entry });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

async function updateEntry(req, res) {
  try {
    const today = new Date().toISOString().slice(0, 10);
    if (req.params.date !== today) {
      return res.status(403).json({ error: 'Past entries cannot be edited' });
    }

    const { color, adjective, customAdjective, rose, bud, thorn, roseParams } = req.body;
    const entry = await Entry.findOneAndUpdate(
      { userId: req.user.id, date: req.params.date },
      { color, adjective, customAdjective, rose, bud, thorn, roseParams },
      { new: true, runValidators: true }
    );

    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.json({ entry });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { listEntries, createEntry, getEntryByDate, updateEntry };
