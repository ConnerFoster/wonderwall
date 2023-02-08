const asyncHandler = require('express-async-handler')

const Post = require('../models/postModel')
const User = require('../models/userModel')

//Get ALL posts
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()

  res.status(200).json(posts)
})

//get current logged in user's posts ONLY
const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id })

  res.status(200).json(posts)
})

//create a post
const setPost = asyncHandler(async (req, res) => {
  if (!req.body.song) {
    res.status(400)
    throw new Error('Please add a song')
  }

  const post = await Post.create({
    text: req.body.text,
    user: req.user.id,
    song: req.body.song,
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

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('user not found')
  }

  //Check that logged in user is the author of the post
  if (post.user.toString() !== user.id) {
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

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('user not found')
  }

  //Check that logged in user is the author of the post
  if (post.user.toString() !== user.id) {
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
