import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { upvote,downvote } from "../../services/vote.service.js";
import { setMessage } from "./message.slice.js";


export const upVoteAnswer = createAsyncThunk(
    'votes/Vote',
    async (voteans, thunkAPI) => {

        try {
            const response = await upvote(voteans)
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
export const downVoteAnswer = createAsyncThunk(
    'votes/Vote',
    async (voteans, thunkAPI) => {

        try {
            const response = await downvote(voteans)
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
    votes:[]
}

const questionSlice = createSlice({
    name: "vote",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(upVoteAnswer.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(upVoteAnswer.fulfilled,(state,action)=>{
            state.answers = action.payload
            state.loading = false
        })
        builder.addCase(upVoteAnswer.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(downVoteAnswer.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(downVoteAnswer.fulfilled,(state,action)=>{
            state.answers = action.payload
            state.loading = false
        })
        builder.addCase(downVoteAnswer.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
    }
});

const { reducer } = questionSlice;
export default reducer;