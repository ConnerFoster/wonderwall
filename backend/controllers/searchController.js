const asyncHandler = require('express-async-handler')
const spotifyApi = require('../spotify')

const searchSpotify = asyncHandler(async (req, res) => {
  const search_term = req.body.search_string

  spotifyApi.searchTracks(search_term, { limit: 5 }).then(
    function (data) {
      res.json(data.body.tracks.items)
    },
    function (err) {
      res.json(err)
    }
  )
})

module.exports = { searchSpotify }
