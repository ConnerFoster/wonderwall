const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  getUserByName,
} = require('../controllers/userController')
const { protectRoute } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.put('/', protectRoute, updateUser)
//change this to /u/username later
router.get('/me', protectRoute, getUser)
router.get('/:username', getUserByName)

module.exports = router
