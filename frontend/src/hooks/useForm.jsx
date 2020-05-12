import {useState} from "react"
import axios from "axios"
export default function useForm(numberOfInputs) {
  const [state, setState] = useState({})
  const [error, setError] = useState("")
  const [redirect, setRedirect] = useState(false)
  const handleChange = (e) => {
    const target = e.target
    setState((prevState) => {
     return {
      ...prevState,
       [target.name]: target.value
     } 
    })
  }
  const handleSubmit = (e, url) => {
    e.preventDefault();
    if(Object.keys(state).length !== numberOfInputs) {
      setError("All inputs are required")
      return;
    }
    axios
      .post(url, state, {withCredentials: true})
      .then(res => {
        const {error, username} = res.data;
        if(error) setError(error) 
        else{
          console.log(username)
          setRedirect(true)
        }
      })
  }
  return {state, handleChange, handleSubmit, redirect, error}
}
