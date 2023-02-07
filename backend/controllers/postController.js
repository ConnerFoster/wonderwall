//Get ALL posts
const getPosts = (req, res) => {
  res.status(200).json({msg: 'get posts'})
}

//create a post
const setPost = (req, res) => {
  res.status(200).json({msg: 'set post'})
}

//update a post
const updatePost = (req, res) => {
  res.status(200).json({msg: 'update a post'})
}

//delete a post
const deletePost = (req, res) => {
  res.status(200).json({msg: 'delete post'})
}

module.exports = {
  getPosts,
  setPost,
  updatePost,
  deletePost,
}
