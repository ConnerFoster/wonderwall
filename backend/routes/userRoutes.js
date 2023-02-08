const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getUser,
} = require('../controllers/userController')
const { protectRoute } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
//change this to /u/username later
router.get('/me', protectRoute, getUser)

module.exports = router
