import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetQuestions ,AskQuestion } from "../../services/questions.service.js";
import { setMessage } from "./message.slice.js";


export const getQuestions = createAsyncThunk(
    'questions/getQuestions',
    async (question, thunkAPI) => {

        try {
            console.log("question call");
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

export const askQuestion = createAsyncThunk(
    'questions/askquestions',
    async (question, thunkAPI) => {

        try {
            const response = await AskQuestion(question);
            thunkAPI.dispatch(setMessage(response.data.message));
            thunkAPI.dispatch(getQuestions())
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
    loading:false,
    error:''
}

const questionSlice = createSlice({
    name: "question",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getQuestions.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(getQuestions.fulfilled,(state,action)=>{
            state.questions = action.payload
            state.loading = false
        })
        builder.addCase(getQuestions.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
    
    }
});

const { reducer } = questionSlice;
export default reducer;