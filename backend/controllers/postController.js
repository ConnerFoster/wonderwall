const asyncHandler = require('express-async-handler')

//Get ALL posts
const getPosts = asyncHandler(async (req, res) => {
  res.status(200).json({message: 'get posts'})
})

//create a post
const setPost = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  res.status(200).json({message: 'set post'})
})

//update a post
const updatePost = asyncHandler(async (req, res) => {
  res.status(200).json({message: 'update a post'})
})

//delete a post
const deletePost = asyncHandler(async (req, res) => {
  res.status(200).json({message: 'delete post'})
})

module.exports = {
  getPosts,
  setPost,
  updatePost,
  deletePost,
}
