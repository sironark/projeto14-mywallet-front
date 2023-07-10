import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import apiAuth from "../services/apiAuth.js";
import { useState } from "react";

export default function SignUpPage() {
  const [form, setForm] = useState({name: "", email: "", password: "",passwordConfirm:""})
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
      console.log(form)
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
        <input data-test="name"
        placeholder="Nome" 
        required
        type="text" 
        name="name" 
        value = {form.name}
        onChange={handleForm}
        />
         <input data-test="email"
         placeholder="E-mail" 
        required
        type="email" 
        name="email" 
        value = {form.email}
        onChange={handleForm}
        />
         <input data-test="password"
         placeholder="Senha" 
        required
        type="password" 
        name="password" 
        value = {form.password}
        onChange={handleForm}
        />
         <input data-test="conf-password" 
         placeholder="Confirme a senha" 
        required
        type="password" 
        name="passwordConfirm" 
        value = {form.passwordConfirm}
        onChange={handleForm}
        />
       
        <button data-test="sign-up-submit" type="submit">Cadastrar</button>
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
