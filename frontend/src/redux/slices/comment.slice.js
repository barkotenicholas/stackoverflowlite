import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetComment,PostComment } from "../../services/comment.service.js";
import { setMessage } from "./message.slice.js";


export const getComments = createAsyncThunk(
    'comment/getCOmment',
    async (question_id, thunkAPI) => {

        try {
            const response = await GetComment(question_id);
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

export const postComment = createAsyncThunk(
    'comment/postComment',
    async (question, thunkAPI) => {

        try {
            const response = await PostComment(question);
            thunkAPI.dispatch(setMessage(response.data.message));
            thunkAPI.dispatch(getComments(question.answer_id));
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
    comments:[],
    loading:false,
    error:''
}

const questionSlice = createSlice({
    name: "question",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getComments.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(getComments.fulfilled,(state,action)=>{
            state.comments = action.payload
            state.loading = false
        })
        builder.addCase(getComments.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
    
    }
});

const { reducer } = questionSlice;
export default reducer;