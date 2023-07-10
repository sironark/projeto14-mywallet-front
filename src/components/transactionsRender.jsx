import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext.js";

export default function EachTransaction ({trans}){
    let valor = Number(trans.value)
    const {soma, setsoma} = useContext(UserContext) 
    if(trans.type === "saida"){
      valor = Number(trans.value) *-1 
    }
      setsoma(valor)
    return(
        <ListItemContainer>
              <div>
                <span>{trans.time}</span>
                <strong>{trans.discription}</strong>
              </div>
              <Value color={trans.type}>{valor}</Value>
            </ListItemContainer>
    );
}

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
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