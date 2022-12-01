import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetQuestions } from "../../services/questions.service.js";
import { setMessage } from "./message.slice.js";


export const getQuestions = createAsyncThunk(
    'auth/signup',
    async (question, thunkAPI) => {

        try {
            const response = await GetQuestions();
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }

    }
)

const initialState = {
    questions:[],
    loading:'idle'
}

const questionSlice = createSlice({
    name: "question",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getQuestions.fulfilled,(state,action)=>{
            state.questions = action.payload
        })
    }
});

const { reducer } = questionSlice;
export default reducer;