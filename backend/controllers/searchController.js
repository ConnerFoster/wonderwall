const asyncHandler = require('express-async-handler')
const spotifyApi = require('../spotify')

const searchSpotify = asyncHandler(async (req, res) => {
  const query = req.body.query

  spotifyApi.searchTracks(query, { limit: 5 }).then(
    function (data) {
      res.json(data.body.tracks)
    },
    function (err) {
      res.json(err)
    }
  )
})

module.exports = { searchSpotify }
