

import { Schema, model, models } from 'mongoose';

const EstimateSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, default: 'Not provided' },
  type: { type: String, required: true },
  withMaterial: { type: Boolean, required: true },
  areaSqft: { type: Number, required: true },
  floors: { type: Number, required: true },
  quality: { type: String, required: true }
}, { timestamps: true, collection: "Estimates"});

const Estimates = models.Estimates || model('Estimates', EstimateSchema);

export default Estimates;
