import axios from "axios";
import authHeader from "./header";

const API_URL = "http://localhost:5100/answers";

export const getAnswers = async (question_id) => {
    let respone = await axios.get(`${API_URL}/${question_id}`,{headers:authHeader()});
    return respone
}

export const postAnswer = async(answer)=>{
    let response = await axios.post(API_URL,answer,{headers:authHeader()})
    return response 
}

export const MarkPreferred = async(answer_id)=>{

    let response = await axios.put(API_URL,{answer_id},{headers:authHeader()})
    return response
}

