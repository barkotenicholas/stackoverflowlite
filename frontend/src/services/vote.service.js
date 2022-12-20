import axios from "axios";
import authHeader from "./header";

export const upvote = async(vote)=>{
    return axios.post(` http://localhost:5100/votes/up`,vote,{headers:authHeader()});
}
export const downvote = async(vote)=>{
    return axios.post(` http://localhost:5100/votes/down`,vote,{headers:authHeader()});
}

