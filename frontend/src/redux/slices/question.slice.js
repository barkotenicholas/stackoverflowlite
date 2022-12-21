import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetQuestions, AskQuestion, getQuestionsForSingleuser, deleteQuestion, getQuestionsByDate, getQuestionsWithMostAnswers, getTotal, EditQuestion } from "../../services/questions.service.js";
import { searchQuestion } from "../../services/search.service.js";
import { setMessage } from "./message.slice.js";


export const getQuestions = createAsyncThunk(
    'questions/getQuestions',
    async (info, thunkAPI) => {

        try {
            console.log("question call");
            const response = await GetQuestions(info);
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
            thunkAPI.dispatch(getQuestions({
                pageno: 1,
                pagesize: 4,
            }))
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
export const editQuiz = createAsyncThunk(
    'questions/editQuestion',
    async (question, thunkAPI) => {

        try {
            const response = await EditQuestion(question.question);
            thunkAPI.dispatch(setMessage(response.data.message));
            thunkAPI.dispatch((getAllUserQuestion(question.currentUser.id)))
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
    async (userid, thunkAPI) => {
        try {
            const response = await getQuestionsForSingleuser(userid)
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
    async (question_id, thunkAPI) => {
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
    async (questin, thunkAPI) => {
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
    async (_, thunkAPI) => {
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
export const getTotalQuestion = createAsyncThunk(
    "questions/getTotalQuestion",
    async (_, thunkAPI) => {
        try {
            const result = await getTotal()
            return result.data
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
export const searchQueryQuestion = createAsyncThunk(
    'questions/search',
    async (search, thunkAPI) => {
        try {
            const response = await searchQuestion(search)
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
    questions: [],
    total: null,
    loading: false,
    error: ''
}

const questionSlice = createSlice({
    name: "question",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getQuestions.pending, (state, action) => {
            state.questions=[]
            state.loading = true
        })
        builder.addCase(getQuestions.fulfilled, (state, action) => {
            state.questions = action.payload
            state.loading = false
        })
        builder.addCase(getQuestions.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(getAllUserQuestion.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getAllUserQuestion.fulfilled, (state, action) => {
            state.questions = action.payload
            state.loading = false
        })
        builder.addCase(getAllUserQuestion.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(deleteSingleQuestion.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteSingleQuestion.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(getQuestionsWithDate.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getQuestionsWithDate.fulfilled, (state, action) => {
            state.questions = action.payload
            state.loading = false
        })
        builder.addCase(getQuestionsWithDate.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(getMostAnsweredQuestion.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getMostAnsweredQuestion.fulfilled, (state, action) => {
            state.questions = action.payload
            state.loading = false
        })
        builder.addCase(getMostAnsweredQuestion.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(getTotalQuestion.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getTotalQuestion.fulfilled, (state, action) => {
            state.total = action.payload
            state.loading = false
        })
        builder.addCase(getTotalQuestion.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(editQuiz.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(editQuiz.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase(editQuiz.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(searchQueryQuestion.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(searchQueryQuestion.fulfilled, (state, action) => {
            state.questions = action.payload
            state.loading = false
        })
        builder.addCase(searchQueryQuestion.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })


    }
});

const { reducer } = questionSlice;
export default reducer;