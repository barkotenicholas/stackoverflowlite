import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth.slice.js";
import messageReducer from "./slices/message.slice.js";
import questionReducer from './slices/question.slice.js';
import answerReducer from './slices/answers.slice.js';
import commentReducer from './slices/comment.slice.js';
const reducer = {
  auth: authReducer,
  message: messageReducer,
  questions:questionReducer,
  answer:answerReducer,
  comments:commentReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;