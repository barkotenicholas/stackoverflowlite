import axios from "axios";
import authHeader from "./header";
const API_URL = "http://localhost:5100/search";

export const searchQuestion = async (info) => {
    
    let respone = await axios.get(`${API_URL}?question=${info}`,{ headers: authHeader() });
    return respone
}