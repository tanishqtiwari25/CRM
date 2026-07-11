const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: [
      'Super Admin', 'Admin', 'Sales Manager', 'Sales Executive', 
      'Project Manager', 'Frontend Developer', 'Backend Developer', 
      'UI/UX Designer', 'Digital Marketing Executive', 'Support Executive', 
      'Finance Manager', 'Customer'
    ], 
    required: true 
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);