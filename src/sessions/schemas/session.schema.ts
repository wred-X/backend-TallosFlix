import * as mongoose from 'mongoose';
export const SessionSchema = new mongoose.Schema({
  user_id: String,
  jwt: String,
});
