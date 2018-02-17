import mongoose from 'mongoose';

/**
 * Chat Log schema
 * @constructor Log
 * @memberof Models
 */
const LogSchema = new mongoose.Schema({
  sender: {
    id: String
  },
  recipient: {
    id: String
  },
  timestamp: Number,
  message: {
    id: String,
    seq: Number,
    text: String
  }
});

export default mongoose.model('logSchema', LogSchema);