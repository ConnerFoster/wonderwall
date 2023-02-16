import axios from 'axios'

const API_URL = 'http://localhost:5000/api/users/'

const getUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + 'me', config)
  console.log(response.data)

  return response.data
}

const userService = {
  getUser,
}

export default userService