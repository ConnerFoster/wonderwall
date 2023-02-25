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
    profilePhoto: '',
    bio: '',
    displayName: '',
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

const getUserByName = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username })

  if (!user) {
    res.status(400)
    throw new Error('user not found')
  }

  res.status(200).json(user)
})

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(400)
    throw new Error('user not found')
  }

  const update = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  })

  res.json(update)
})

//Create JWT
const createJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  getUserByName,
}
