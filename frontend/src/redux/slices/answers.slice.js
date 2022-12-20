import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAnswers, postAnswer ,MarkPreferred} from "../../services/answers.service.js";
import { GetQuestion } from "../../services/questions.service.js";
import { setMessage } from "./message.slice.js";


export const fetchAnswers = createAsyncThunk(
    'answers/getSingleAnswer',
    async (id, thunkAPI) => {

        try {
            const response = await getAnswers(id);
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

export const addAnswer = createAsyncThunk(
    'answers/addAnswer',
    async(answer,thunkAPI)=>{
        try {
            const response = await postAnswer(answer);
            thunkAPI.dispatch(setMessage(response.data.message));
            thunkAPI.dispatch(fetchAnswers(answer.questionid))
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



export const getSingleQuestion = createAsyncThunk(
    'question/allQuestions',
    async(question_id,thunkAPI)=>{
        try {
            console.info(question_id);
            const response = await GetQuestion(question_id);
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

export const markPreferred = createAsyncThunk(
    'question/markPreferred',
    async(info,thunkAPI)=>{
        try {
            console.log(info.answer_id);
            const response = await MarkPreferred(info.answer_id);
            console.log(info.id);
            thunkAPI.dispatch(fetchAnswers(info.id));
            thunkAPI.dispatch(getSingleQuestion(info.id))
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
    answers:[],
    questionAsked:null,
    questionAuthor:null,
    loading:false,
    error:''
}

const questionSlice = createSlice({
    name: "answers",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchAnswers.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(fetchAnswers.fulfilled,(state,action)=>{
            state.answers = action.payload
            state.loading = false
        })
        builder.addCase(fetchAnswers.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(getSingleQuestion.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(getSingleQuestion.fulfilled,(state,action)=>{
            state.questionAsked = action.payload
            state.loading = false
        })
        builder.addCase(getSingleQuestion.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(markPreferred.pending,(state,action)=>{
            state.loading=true
            state.answers=[]
        })
        builder.addCase(markPreferred.fulfilled,(state,action)=>{
            state.questionAsked = action.payload
            state.loading = false
        })
        builder.addCase(markPreferred.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
    }
});

const { reducer } = questionSlice;
export default reducer;