import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  avatar: String,
  name: String,
  email: String,
  password: String,
  role: String
});
