import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { vote } from "../../services/vote.service.js";
import { setMessage } from "./message.slice.js";


export const VoteAnswer = createAsyncThunk(
    'votes/Vote',
    async (voteans, thunkAPI) => {

        try {
            const response = await vote(voteans)
            thunkAPI.dispatch(setMessage(response.data.message));
            thunkAPI.dispatch()
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
        builder.addCase(VoteAnswer.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(VoteAnswer.fulfilled,(state,action)=>{
            state.answers = action.payload
            state.loading = false
        })
        builder.addCase(VoteAnswer.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
    }
});

const { reducer } = questionSlice;
export default reducer;