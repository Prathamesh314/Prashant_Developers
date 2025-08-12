

import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, default: 'Not provided' },
  type: { type: String, required: true },
  withMaterial: { type: Boolean, required: true },
  areaSqft: { type: Number, required: true },
  floors: { type: Number, required: true },
  quality: { type: String, required: true }
}, { timestamps: true, collection: "Users"});

const User = models.User || model('User', UserSchema);

export default User;
