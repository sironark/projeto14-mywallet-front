import axios from "axios"

function getConfig(token){
    return {
        headers:{
          Authorization: `Bearer ${token}` 
                }
      }
}

function login(body){
    const promisse = axios.post(`${import.meta.env.VITE_API_URL}/login`, body)
    return promisse
}
function signUp(body){
    const promisse = axios.post(`${import.meta.env.VITE_API_URL}/sing-up`, body)
    return promisse
}

function getTransactions(token, body){
    console.log(token, body)
    const promisse = axios.get(`${import.meta.env.VITE_API_URL}`,body, getConfig(token))
    return promisse
}

function createTransaction(token,body){
    const promisse = axios.post(`${import.meta.env.VITE_API_URL}/input`,body, getConfig(token))
    return promisse
}

const apiAuth = {login, signUp, getTransactions, createTransaction};
export default apiAuth