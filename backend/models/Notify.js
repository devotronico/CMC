const mongoose = require('mongoose');
const NotifySchema = new mongoose.Schema({
  number: { type: Number, default: 0 },
  opened: { type: Number, default: 0 },
  closed: { type: Number, default: 0 },
  updateDate: {
    type: Date,
    default: Date.now
  },
  createDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Notify = mongoose.model('notifies', NotifySchema);
