import axios from "axios";

const API_URL = "http://localhost:5100/question";

export const GetQuestions = async () => {
    console.log("apis");

    let respone = await axios.get(API_URL);
    return respone
}
export const AskQuestion = async (question) => {
    return axios.post(API_URL, question)
}

