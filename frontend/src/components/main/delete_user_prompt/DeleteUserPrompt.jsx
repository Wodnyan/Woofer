import React, {useState} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .5);
  color: #000;
  z-index: 50000;
`;
const Button = styled.button`
  color: ${props => {
    if(props.cancel) return "blue"
    return "red"
  }};
  opacity: ${props => {
    if(props.state === "DELETE") return "1"
    if(!props.cancel) return ".6"
  }};
  cursor: pointer;
`;
const PromptContainer = styled.div`
  padding: 2em;
  width: 40%;
  text-align: center;
  background: #fff;
  @media only screen and (max-width: 760px) {
    width: 100%
  }
`;
const Input = styled.input`
  width: 100%;
  color: red;
`

export default function DeleteUserPromp(props) {
  const {exit} = props;
  const [state, setState] = useState("");
  const [redirect, setRedirect] = useState(false);
  const url = "http://localhost:3000/user/delete"
  const handleDelete = () => {
    if(state === "DELETE"){
      axios
        .delete(url, {withCredentials: true})
        .then((res) => {
          setRedirect(true)
        })
    }
    else{
      setState("")
    }
  }
  if(redirect) return <Redirect to="/" />
  return (
    <Container>
      <PromptContainer>
        <h1>
          Whoa, There!
        </h1>
        <p>
          Once you delete your account,there's no getting it back.
          Make sure you want to do this.
        </p>
        <Input name="check" type="text" placeholder="Type in DELETE to confirm" onChange={e => setState(e.target.value)} value={state}></Input>
        <Button onClick={() => exit()}>
          Cancel
        </Button>
        <Button state={state} onClick={handleDelete}>
          Delete Account
        </Button>
      </PromptContainer>
    </Container>
  )
}

