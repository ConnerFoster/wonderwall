const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getUser,
  storeImage,
} = require('../controllers/userController')
const { protectRoute } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/store-image', storeImage)
//change this to /u/username later
router.get('/me', protectRoute, getUser)

module.exports = router
