const mongoose = require('mongoose');

const Mixed = mongoose.Schema.Types.Mixed;
const SubscribersSchema = new mongoose.Schema({
  endpoint: String,
  keys: Mixed,
  createDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Subscribers = mongoose.model(
  'notifysubscribers',
  SubscribersSchema
);
