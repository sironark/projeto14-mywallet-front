import axios from "axios"


const VITE_API_URL = 'http://localhost:5000'

function login(body){
    const promisse = axios.post(`${VITE_API_URL}/login`, body)
    return promisse
}
function signUp(body){
    const promisse = axios.post(`${VITE_API_URL}/sing-up`, body)
    return promisse
}

const apiAuth = {login, signUp};
export default apiAuth