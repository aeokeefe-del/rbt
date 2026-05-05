'use strict';

const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    color: {
      name: { type: String, required: true },
      hex: { type: String, required: true },
    },
    adjective: { type: String, required: true },
    customAdjective: { type: String, default: '' },
    rose: { type: String, default: '' },
    bud: { type: String, default: '' },
    thorn: { type: String, default: '' },
    roseParams: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

// One entry per user per day
entrySchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Entry', entrySchema);
