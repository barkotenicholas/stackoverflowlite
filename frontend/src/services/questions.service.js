import axios from "axios";

const API_URL = "http://localhost:5100/question";

export const GetQuestions = async () => {
    let respone = await axios.get(API_URL);
    return respone
}
export const GetQuestion = async (id) => {
    console.log(`${API_URL}/${id}`);
    let respone = await axios.get(`${API_URL}/${id}`);
    return respone
}
export const AskQuestion = async (question) => {
    return axios.post(API_URL, question)
}

export const GetSingleQuestion = async (id) => {
    let respone = await axios.get(`${API_URL}/${id}`);
    return respone
}
