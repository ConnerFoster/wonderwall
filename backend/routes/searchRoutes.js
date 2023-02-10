const express = require('express')
const router = express.Router()

const { searchSpotify } = require('../controllers/searchController')

router.get('/', searchSpotify)

module.exports = router
