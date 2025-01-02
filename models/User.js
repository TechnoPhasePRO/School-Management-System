const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['superadmin', 'school-admin'], required: true },
  tokens: [{ token: { type: String, required: true } }],
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString(), role: this.role }, process.env.JWT_SECRET);
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
