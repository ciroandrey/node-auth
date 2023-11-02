const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
