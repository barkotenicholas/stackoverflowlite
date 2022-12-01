import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth.slice.js";
import messageReducer from "./slices/message.slice.js";
import questionReducer from './slices/question.slice.js';

const reducer = {
  auth: authReducer,
  message: messageReducer,
  questions:questionReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;