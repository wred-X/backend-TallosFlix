import * as mongoose from 'mongoose';

export const PeopleSchema = new mongoose.Schema({
  deathDate: String,
  image: Object,
  gender: String,
  name: String,
  birthDate: String,
  birthPlace: String,
  heightCentimeters: Number,
  miniBios: String,
});
