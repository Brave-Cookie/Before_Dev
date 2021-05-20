import axios from "axios";

const DefalutAxios = axios.create({
    baseURL : 'http://localhost:3000/api'
})

export function registUser(user_data){
    return DefalutAxios.post('/auth/register',user_data);
}

export function userLogin(user_id, user_pw){
    return DefalutAxios.post('/auth/login', { user_id, user_pw });
}

export function createProject(user_id, project_name) {
    return DefalutAxios.post('/project/create', { user_id, project_name });
}

export function getProject(user_id) {
    return DefalutAxios.get('/project/list/' + user_id)
}

// jeonbar

const FlaskAxios = axios.create({
    baseURL : 'http://localhost:5000/api'
})

export function axios_test() {
    return FlaskAxios.post('/test')
}
export function axios_summarize(meeting_id) {
    console.log("여기서는?")
    return FlaskAxios.get('/log/summary/'+meeting_id)
}