import axios from "axios";
import authHeader from "./header";

const API_URL = "http://localhost:5100/comment";

export const GetComment = async (id) => {
    let respone = await axios.get(`${API_URL}/${id}`,{headers:authHeader()});
    return respone
}
export const PostComment = async (comment) => {
    return axios.post(API_URL, comment,{headers:authHeader()})
}

