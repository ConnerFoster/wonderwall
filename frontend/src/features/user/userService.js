import axios from 'axios'

const API_URL = 'http://localhost:5000/api/users/'

const getUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + 'me', config)

  return response.data
}

const updateUser = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const body = {
    profilePhoto: data.profilePhoto,
    bio: data.bio,
    displayName: data.displayName,
  }
  console.log(body)
  const response = await axios.put(API_URL, body, config)

  return response.data
}

const userService = {
  getUser,
  updateUser,
}

export default userService
