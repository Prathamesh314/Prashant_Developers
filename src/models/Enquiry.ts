

import { Schema, model, models } from 'mongoose';

const EnquirySchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  city: { type: String, default: '' },
  message: { type: String, required: true }
}, { timestamps: true, collection: "Enquiries" });

const Enquiry = models.Enquiry || model('Enquiry', EnquirySchema);

export default Enquiry;
