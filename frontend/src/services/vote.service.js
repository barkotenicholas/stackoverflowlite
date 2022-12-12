import axios from "axios";

const API_URL = "http://localhost:5100/votes";

export const vote = async(vote)=>{
    return axios.post(API_URL,vote);
}

