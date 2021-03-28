const mongoose = require('mongoose');
const LogSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  method: {
    type: String, // !
    enum: ['GET', 'POST', 'PUT', 'DELETE'],
    required: true
  },
  code: {
    type: Number,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isFake: {
    type: Boolean,
    default: false
  }
});

module.exports = Log = mongoose.model('log', LogSchema);
