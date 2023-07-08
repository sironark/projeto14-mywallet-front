import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import apiAuth from "../services/apiAuth";
import { useState } from "react";

export default function SignUpPage() {
  const [form, setForm] = useState({name: "", email: "", password: "",})
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState({confirmPass:""})

  function handleForm(e){
    setForm({...form, [e.target.name]: e.target.value})
    setConfirm({...confirm, [e.target.name]: e.target.value})
  }

  function handleSignUp(e){
    e.preventDefault();
    if(form.password === form.passwordConfirm){
      delete form.passwordConfirm
    apiAuth.signUp(form)
      .then(res =>{
        navigate('/')
      })
      .catch(err =>{
        alert(err.response.data.message)
      })
    }
  }

  return (
    <SingUpContainer>
      <form onSubmit={handleSignUp}>
        <MyWalletLogo />
        <input placeholder="Nome" 
        required
        type="text" 
        name="name" 
        value = {form.name}
        onChange={handleForm}
        />
         <input placeholder="E-mail" 
        required
        type="email" 
        name="email" 
        value = {form.email}
        onChange={handleForm}
        />
         <input placeholder="Senha" 
        required
        type="password" 
        name="password" 
        value = {form.password}
        onChange={handleForm}
        />
         <input placeholder="Confirme a senha" 
        required
        type="password" 
        name="passwordConfirm" 
        value = {form.passwordConfirm}
        onChange={handleForm}
        />
       
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
