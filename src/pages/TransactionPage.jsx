import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { UserContext } from "../contexts/UserContext.js";
import apiAuth from "../services/apiAuth.js";

export default function TransactionsPage() {
  const {user, type} = useContext(UserContext)
  
  const navigate = useNavigate();
  const [form, setForm] = useState({value: "", discription: ""})

  function handleForm(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  function sendTransaction(e){
    e.preventDefault();
    
    const body = {...form, type, email:user.email}
    console.log(body)
    apiAuth.createTransaction(user.token, body )
      .then(res =>{
        navigate("/home")
      })
      .catch(err => alert(err.response.data))
        navigate("/home")
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={sendTransaction}> 
        <input required data-test="registry-amount-input"  placeholder="Valor" type="number" name="value" onChange={handleForm}/>
        <input required data-test="registry-name-input"  placeholder="Descrição" type="text" name="discription" onChange={handleForm}/>
        <button data-test="registry-save" type="submit">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
