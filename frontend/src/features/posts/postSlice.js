import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'

const initialState = {
  posts: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

export const getPosts = createAsyncThunk(
  'post/getPosts',
  async (_, thunkAPI) => {
    try {
      return await postService.getPosts()
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

export const submitPost = createAsyncThunk(
  'post/submitPost',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.submitPost(data, token)
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

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isSuccess = true
        state.posts = action.payload
        state.isLoading = false
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.isLoading = false
      })
  },
})

export const { reset } = postSlice.actions
export default postSlice.reducer
