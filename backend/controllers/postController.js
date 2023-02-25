const asyncHandler = require('express-async-handler')
const spotifyApi = require('../spotify')
const Post = require('../models/postModel')
const User = require('../models/userModel')

//Get ALL posts
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate('user')
    .populate('likes')

  res.status(200).json(posts)
})

//get current logged in user's posts ONLY
const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.params.id })
    .populate('user')
    .populate('likes')
    .sort({ createdAt: -1 })

  res.status(200).json(posts)
})

const getPostsByUsername = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username })
  const posts = await Post.find({ user: user.id })
    .populate('user')
    .populate('likes')
    .sort({ createdAt: -1 })

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
    likes: [],
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

//Function to handle likes on posts. Should rename because it also handles removing likes
const addLike = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const post = await Post.findById(req.params.postid)

  if (!user) {
    res.status(401)
    console.log('user not found')
    throw new Error('user not found')
  }

  if (!post) {
    res.status(401)
    throw new Error('post not found')
  }

  let update

  if (post.likes.includes(req.user._id)) {
    update = await Post.updateOne(
      { _id: req.params.postid },
      { $pull: { likes: req.user._id } }
    )
  } else
    update = await Post.updateOne(
      { _id: req.params.postid },
      { $push: { likes: req.user._id } }
    )

  res.status(200).json(update)
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
  addLike,
  getPostsByUsername,
}
