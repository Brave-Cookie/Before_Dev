import axios from "axios";

const DefalutAxios = axios.create({
    baseURL : 'http://localhost:3000/api'
})

export function test(){
    return DefalutAxios.post('/test/chk_DB');   
}