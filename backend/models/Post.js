const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  tags: {
    type: [String],
    required: true
  },
  isFake: {
    type: Boolean,
    default: false
  },
  readed_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  deleted_at: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      text: {
        type: String,
        required: true
      },
      created_at: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model('post', PostSchema, 'posts');
