import axios from "axios";

const DefalutAxios = axios.create({
    baseURL : 'http://localhost:3000/api'
})

export function registUser(user_data){
    return DefalutAxios.post('/auth/register',user_data);
}