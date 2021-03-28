const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProfileSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String
  },
  lastname: {
    type: String
  },
  age: {
    type: Number,
    default: 1
  },
  gender: {
    type: String,
    enum: ['M', 'F']
  },
  tel: {
    type: String
  },
  address: {
    type: String
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  isFake: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('profile', ProfileSchema, 'profiles');
