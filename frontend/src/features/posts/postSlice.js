import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'

const initialState = {
  posts: [],
  userPosts: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

export const getPosts = createAsyncThunk('post/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await postService.getPosts(token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getUserPosts = createAsyncThunk(
  'post/getUserPosts',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.getUserPosts(id, token)
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
      .addCase(submitPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(submitPost.fulfilled, (state, action) => {
        state.isSuccess = true
        state.posts.push(action.payload)
        state.isLoading = false
      })
      .addCase(submitPost.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.isLoading = false
      })
      .addCase(getUserPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.isSuccess = true
        state.userPosts = action.payload
        state.isLoading = false
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.isLoading = false
      })
  },
})

export const { reset } = postSlice.actions
export default postSlice.reducer
