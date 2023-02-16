const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    profilePhoto: {
      type: String,
    },
    bio: {
      type: String,
    },
    displayName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
