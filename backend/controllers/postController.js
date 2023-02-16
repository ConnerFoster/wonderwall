const asyncHandler = require('express-async-handler')
const spotifyApi = require('../spotify')
const Post = require('../models/postModel')
const User = require('../models/userModel')

//Get ALL posts
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate('user')

  res.status(200).json(posts)
})

//get current logged in user's posts ONLY
const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id }).populate('user')

  res.status(200).json(posts)
})

//create a post
const setPost = asyncHandler(async (req, res) => {
  if (
    !req.body.songTitle ||
    !req.body.songArtist ||
    !req.body.songImgUrl ||
    !req.body.songPreviewUrl
  ) {
    res.status(400)
    throw new Error('Please add a song')
  }

  const post = await Post.create({
    text: req.body.text,
    user: req.user.id,
    songTitle: req.body.songTitle,
    songArtist: req.body.songArtist,
    songImgUrl: req.body.songImgUrl,
    songPreviewUrl: req.body.songPreviewUrl,
    likes: 0,
    comments: [],
  })

  res.status(200).json(post)
})

//update a post
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400)
    throw new Error('Post not found')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('user not found')
  }

  //Check that logged in user is the author of the post
  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User is not authorized to update this post')
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedPost)
})

//delete a post
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400)
    throw new Error('Post not found')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('user not found')
  }

  //Check that logged in user is the author of the post
  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User is not authorized to delete this post')
  }

  await post.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getPosts,
  getUserPosts,
  setPost,
  updatePost,
  deletePost,
}
