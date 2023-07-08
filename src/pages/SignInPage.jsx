import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import apiAuth from "../services/apiAuth";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

export default function SignInPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({email: "", password: ""})
  const {user, setUser} = useContext(UserContext)
  
  function handleForm(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  function handleLogin(e){
    e.preventDefault();
    
    apiAuth.login(form)
      .then(res =>{
        const{email, name, token} = res.data
        setUser({email, name, token})
        console.log("login ok")
        navigate("/home")
      })
      .catch(err=>{
        alert(err.response.data)
      })
  }

  return (
    <SingInContainer>
      <form onSubmit={handleLogin}>
        <MyWalletLogo />
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
        autocomplete="new-password" 
        name="password"
        value = {form.password}
        onChange={handleForm}/>
        

        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
