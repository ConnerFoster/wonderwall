const express = require('express')
const router = express.Router()
const {
  getPosts,
  getUserPosts,
  setPost,
  updatePost,
  deletePost,
  addLike,
  getPostsByUsername,
} = require('../controllers/postController')

const { protectRoute } = require('../middleware/authMiddleware')

router.get('/', protectRoute, getPosts)

//router.get('/:id', getUserPosts)

router.get('/:username', getPostsByUsername)

router.post('/', protectRoute, setPost)

router.post('/:postid/likes', protectRoute, addLike)

router.put('/:id', protectRoute, updatePost)

router.delete('/:id', protectRoute, deletePost)

module.exports = router
