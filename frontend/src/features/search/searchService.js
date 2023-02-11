import axios from 'axios'

const API_URL = 'http://localhost:5000/api/search/'

const getSearchResults = async (query) => {
  const body = {
    query: query,
  }
  const response = await axios.post(API_URL, body)

  return response.data
}

const searchService = {
  getSearchResults,
}

export default searchService
