const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
  {
    text: {
      type: String,
    },
    song: {
      type: String,
      required: [true, 'Posts must include a song.'],
    },
    likes: {
      type: Number,
    },
    comments: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Post', postSchema)
