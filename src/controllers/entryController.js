'use strict';

const Entry = require('../models/Entry');

function today() {
  return new Date().toISOString().slice(0, 10);
}

async function getEntries(req, res) {
  try {
    const { year, month, current } = req.query;
    const userId = req.user.id;

    if (current) {
      const entry = await Entry.findOne({ userId, date: today() });
      return res.json({ entry: entry || null });
    }

    const filter = { userId };
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
    const { color, adjective, customAdjective, rose, bud, thorn, roseParams } = req.body;
    if (!color || !adjective) {
      return res.status(400).json({ error: 'color and adjective are required' });
    }

    const entry = await Entry.create({
      userId: req.user.id,
      date: today(),
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
    if (err.code === 11000) return res.status(409).json({ error: 'Entry already exists for today' });
    res.status(500).json({ error: 'Server error' });
  }
}

async function updateEntry(req, res) {
  try {
    const { color, adjective, customAdjective, rose, bud, thorn, roseParams } = req.body;
    const entry = await Entry.findOneAndUpdate(
      { userId: req.user.id, date: today() },
      { color, adjective, customAdjective, rose, bud, thorn, roseParams },
      { new: true, runValidators: true }
    );

    if (!entry) return res.status(404).json({ error: 'No entry for today' });
    res.json({ entry });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { getEntries, createEntry, updateEntry };
