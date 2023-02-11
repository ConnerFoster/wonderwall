const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
    },
    songTitle: {
      type: String,
      required: [true, 'Posts must include a song.'],
    },
    songArtist: {
      type: String,
      required: [true, 'Songs must include an artist.'],
    },
    songImgUrl: {
      type: String,
      required: [true, 'Songs must include a url.'],
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
