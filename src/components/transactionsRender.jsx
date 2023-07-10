import styled from "styled-components";

export default function EachTransaction ({trans}){

    return(
        <ListItemContainer>
              <div>
                <span>{trans.time}</span>
                <strong>{trans.discription}</strong>
              </div>
              <Value color={trans.type}>{trans.value}</Value>
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