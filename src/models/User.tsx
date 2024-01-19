
import mongoose, { Schema, model, models } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Define el modelo si no está definido
const userSchema: Schema = new Schema({
  id: { type: String, default: uuidv4, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
});

export default mongoose.models?.User || mongoose.model('User', userSchema)
