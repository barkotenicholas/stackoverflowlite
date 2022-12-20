import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetQuestions ,AskQuestion ,getQuestionsForSingleuser ,deleteQuestion ,getQuestionsByDate ,getQuestionsWithMostAnswers } from "../../services/questions.service.js";
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
export const getAllUserQuestion = createAsyncThunk(
    "get",
    async(userid,thunkAPI)=>{
        try {
            const response = await  getQuestionsForSingleuser(userid)
            return response.data
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
export const deleteSingleQuestion = createAsyncThunk(
    'questin/delete',
    async(question_id,thunkAPI)=>{
        try {
            const response = await deleteQuestion(question_id)
            console.log(response.data);
            return response.data
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
export const getQuestionsWithDate = createAsyncThunk(
    'questin/getQuestionDate',
    async(questin,thunkAPI)=>{
        try {
            const response = await getQuestionsByDate()
            return response.data
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
export const getMostAnsweredQuestion = createAsyncThunk(
    'questions/mostAnswered',
    async(_,thunkAPI)=>{
        try {
            const response = await getQuestionsWithMostAnswers()
            return response.data
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
        builder.addCase(getAllUserQuestion.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(getAllUserQuestion.fulfilled,(state,action)=>{
            state.questions = action.payload
            state.loading = false
        })
        builder.addCase(getAllUserQuestion.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(deleteSingleQuestion.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(deleteSingleQuestion.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(getQuestionsWithDate.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(getQuestionsWithDate.fulfilled,(state,action)=>{
            state.questions = action.payload
            state.loading=false
        })
        builder.addCase(getQuestionsWithDate.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(getMostAnsweredQuestion.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(getMostAnsweredQuestion.fulfilled,(state,action)=>{
            state.questions = action.payload
            state.loading=false
        })
        builder.addCase(getMostAnsweredQuestion.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
    
    }
});

const { reducer } = questionSlice;
export default reducer;