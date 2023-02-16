const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400)
    throw new Error('Both fields required')
  }

  //check if username is already registered
  const userExists = await User.findOne({ username })

  if (userExists) {
    res.status(400)
    throw new Error('Username already registered')
  }

  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPW = await bcrypt.hash(password, salt)

  const user = await User.create({
    username,
    password: hashedPW,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      token: createJWT(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//Authenticate user
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  //check that user is registered and that they have entered correct pw
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      token: createJWT(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid username or password')
  }
})

//Get user's data
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

const updateUser = asyncHandler(async (req, res) => {
  const id = req.user.id

  if (!id) {
    throw new Error('ID not provided')
  }

  await User.findByIdAndUpdate(id, req.body, (err, update) => {
    if (err) {
      console.log(err)
    } else {
      console.log(update)
    }
  })
})

//Create JWT
const createJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

const storeImage = asyncHandler(async (req, res) => {
  const { userId, image } = req.body

  if (!userId || !image) {
    res.status(400)
    throw new Error('Both fields required')
  }

  const user = await User.findById(userId)

  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }

  user.profilePhoto = image
  await user.save()
})

module.exports = {
  registerUser,
  loginUser,
  getUser,
  storeImage,
  updateUser,
}
