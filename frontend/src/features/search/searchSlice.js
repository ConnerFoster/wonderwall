import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import searchService from './searchService'

const initialState = {
  searchResults: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

export const getSearchResults = createAsyncThunk(
  'search/getSearchResults',
  async (query, thunkAPI) => {
    try {
      return await searchService.getSearchResults(query)
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

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    reset: (state) => {
      state.searchResults = []
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.searchResults = action.payload
      })
      .addCase(getSearchResults.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.searchResults = []
      })
  },
})

export const { reset } = searchSlice.actions
export default searchSlice.reducer
