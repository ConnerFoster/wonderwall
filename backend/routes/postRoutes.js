const express = require('express')
const router = express.Router()
const {
  getPosts,
  getUserPosts,
  setPost,
  updatePost,
  deletePost,
} = require('../controllers/postController')

const { protectRoute } = require('../middleware/authMiddleware')

router.get('/', protectRoute, getPosts)

router.get('/:id', protectRoute, getUserPosts)

router.post('/', protectRoute, setPost)

router.put('/:id', protectRoute, updatePost)

router.delete('/:id', protectRoute, deletePost)

module.exports = router
