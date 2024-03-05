const { Schema, model } = require('mongoose');

const warningSchema = new Schema({
  userID: {
    type: String,
    required: true
  },
  serverID: {
    type: String,
    required: true
  },
  moderatorID: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('Warning', warningSchema);
