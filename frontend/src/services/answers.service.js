import axios from "axios";

const API_URL = "http://localhost:5100/answers";

export const getAnswers = async (question_id) => {
    console.log(`${API_URL}/${question_id}`);
    let respone = await axios.get(`${API_URL}/${question_id}`);
    return respone
}

export const postAnswer = async(answer)=>{
    let response = await axios.post(API_URL,answer)
    return response 
}



