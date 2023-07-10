import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import apiAuth from "../services/apiAuth.js";
import EachTransaction from "../components/transactionsRender.jsx";
import { UserContext } from "../contexts/UserContext.js";
import axios from "axios";
import React from "react";

export default function HomePage() {
  const [renderData, setRenderData] = useState([]);
  const navigate = useNavigate();
  const {user, setType} = useContext(UserContext)
  let somaList = []
  const [soma, setsoma] = useState(0)

  useEffect(getItens,[]);

  function getItens(){
   
    const body = {
        email: user.email
    }
    const config = {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    }
    console.log(body, config)
    //apiAuth.getTransactions(userToken, user)

    axios.get(`${import.meta.env.VITE_API_URL}/transactions`, 
    {email: user.email},
    {headers: {
        'Authorization': `Bearer ${user.token}`
      }})
      .then(res => {
        console.log(res.data)
        const data = res.data
        data.reverse()
        setRenderData(data)
        data.forEach(element => {
          if(element.type === "saida"){
            somaList.push(Number(element.value) *-1)
          }else{somaList.push(Number(element.value))}
        })
        setsoma(somaList.reduce((accumulator,value) =>  accumulator + value,0));
      })
      .catch(err => console.log(err.response.data))    
  }

  function newInput(e){
    e.preventDefault();
    setType("entrada");
    navigate("/nova-transacao/entrada")
  }

  function newDebit(e){
    e.preventDefault();
    setType("saida");
    navigate("/nova-transacao/saida")
  }

  function logOut(e){
    e.preventDefault();

    navigate("/")
  }
  
  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {user.name}</h1>
        <BiExit data-test="logout" onClick={logOut}/>
      </Header>

      <TransactionsContainer>
        <ul>
          {renderData.map((rec) => (
          <EachTransaction key={rec._id} trans={rec}/>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value data-test="total-amount" color={soma}>{soma}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button data-test="new-income" onClick={newInput}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button data-test="new-expense" onClick={newDebit}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" || props.color > 0 ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`