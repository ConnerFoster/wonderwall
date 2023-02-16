import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

//const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  userProfile: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getUser = createAsyncThunk('user/getUser', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await userService.getUser(token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.updateUser(data, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isSuccess = true
        state.userProfile = action.payload
        state.isLoading = false
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.isLoading = false
      })
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer
