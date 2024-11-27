import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  requestsRemaining: { type: Number, default: 100 },
});

export default mongoose.model('User', userSchema);

