const asyncHandler = require('express-async-handler')

const Post = require('../models/postModel')

//Get ALL posts
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()

  res.status(200).json(posts)
})

//create a post
const setPost = asyncHandler(async (req, res) => {
  if (!req.body.song) {
    res.status(400)
    throw new Error('Please add a song')
  }

  const post = await Post.create({
    text: req.body.text || '',
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

  await post.remove()

  res.status(200).json({id: req.params.id})
})

module.exports = {
  getPosts,
  setPost,
  updatePost,
  deletePost,
}
