import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import postReducer from '../features/posts/postSlice'
import searchReducer from '../features/search/searchSlice'

export const store = configureStore({
  reducer: { auth: authReducer, post: postReducer, search: searchReducer },
})
