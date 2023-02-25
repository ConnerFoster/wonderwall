import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

//const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  userProfile: {},
  userLookup: {},
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

export const getUserByName = createAsyncThunk(
  'user/getUserByName',
  async (username, thunkAPI) => {
    try {
      return await userService.getUserByName(username)
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
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isSuccess = true
        state.userProfile.bio = action.payload.bio
        state.userProfile.profilePhoto = action.payload.profilePhoto
        state.userProfile.displayName = action.payload.displayName
        state.isLoading = false
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.isLoading = false
      })
      .addCase(getUserByName.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserByName.fulfilled, (state, action) => {
        state.isSuccess = true
        state.userLookup = action.payload
        state.isLoading = false
      })
      .addCase(getUserByName.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.isLoading = false
      })
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer
