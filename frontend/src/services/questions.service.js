import axios from "axios";
import authHeader from "./header";
const API_URL = "http://localhost:5100/question";

export const GetQuestions = async (info) => {
    
 
    let respone = await axios.get(`${API_URL}/${info.pageno}/${info.pagesize}`,{ headers: authHeader() });

    return respone
}
export const GetQuestion = async (id) => {
     let respone = await axios.get(`${API_URL}/${id}`,{ headers: authHeader() });
    return respone
}
export const AskQuestion = async (question) => {
    return axios.post(API_URL, question,{ headers: authHeader() })
}
export const getQuestionsByDate = async()=>{
    let respone = await axios.get(`${API_URL}/bydate`,{headers:authHeader()});
    return respone
}
export const getQuestionsWithMostAnswers=async()=>{
    let respone = await axios.get(`${API_URL}/mostanswered`,{headers:authHeader()});
    return respone
}
export const getQuestionsForSingleuser = async(uid)=>{
    const response = axios.get(`${API_URL}/profile/user/${uid}`,{ headers: authHeader() })
    return response
}
export const deleteQuestion = async(qid)=>{
    const response = axios.delete(`${API_URL}/${qid}`,{ headers: authHeader() })

    return response
}
export const GetSingleQuestion = async (id) => {
    let respone = await axios.get(`${API_URL}/${id}`,{ headers: authHeader() });
    return respone
}
export const getTotal = async()=>{
    let respone = await axios.get(`${API_URL}/getTotalQuestions`,{ headers: authHeader() });
    return respone
}
