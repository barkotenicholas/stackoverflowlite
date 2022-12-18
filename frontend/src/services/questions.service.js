import axios from "axios";
import authHeader from "./header";
const API_URL = "http://localhost:5100/question";

export const GetQuestions = async () => {
    console.log(authHeader());
    let respone = await axios.get(API_URL, { headers: authHeader() });
    console.log(respone.data);
    return respone
}
export const GetQuestion = async (id) => {
    console.log(`${API_URL}/${id}`);
    let respone = await axios.get(`${API_URL}/${id}`,{ headers: authHeader() });
    return respone
}
export const AskQuestion = async (question) => {
    return axios.post(API_URL, question,{ headers: authHeader() })
}

export const GetSingleQuestion = async (id) => {
    let respone = await axios.get(`${API_URL}/${id}`,{ headers: authHeader() });
    return respone
}
