import axios from "axios";

const API_URL = "http://localhost:5050/auth";

export const Login = async(login)=>{
    return axios.post(API_URL+'/login',login).then((response)=>{
        if(response.data.token){
            sessionStorage.setItem("user", JSON.stringify(response.data));
        
        }
        return response.data
    })
}
export const Register = async   (User)=>{
    return axios.post(API_URL+'/signup',User)
}

export const Logout = ()=>{
    sessionStorage.removeItem('user')
}