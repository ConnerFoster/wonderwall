import axios from 'axios'

const API_URL = 'http://localhost:5000/api/posts/'

const getPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)

  return response.data
}

const submitPost = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, data, config)

  return response.data
}

const getUserPosts = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + 'id', config)

  return response.data
}

const postService = {
  getPosts,
  submitPost,
  getUserPosts,
}

export default postService
