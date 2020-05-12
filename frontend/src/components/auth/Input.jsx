import React from "react"
import {Link, Redirect} from "react-router-dom"
import "./styles/Input.scss"
import useForm from "../../hooks/useForm.jsx"
export default function Input(props) {
  const {title, url} = props;
  const {state, handleChange, handleSubmit, redirect, error} = useForm(2)
  return(
    <div className="input-container">
      <h1 className="input-title">
      🐶{title}🐶
      </h1>
      <form onSubmit={(e) => handleSubmit(e, url)}> 
        <label>
          <p className="input-header">Username</p>
          <input className="input input--username" type="text" name="username" onChange={handleChange} value={state.username || ""}></input>
        </label>
        <label>
          <p className="input-header">Password</p>
          <input className="input input--password" type="password" name="password" onChange={handleChange} value={state.password || ""}></input>
        </label>
        {error && <h1 className="input-error-msg">{error}</h1>}
        <button type="submit" className="submit-btn">{title}</button>
      </form>
      {title === "Login" ? <p className="usr-q">Not a member? <Link to="./sign-up">Sign up now</Link></p> : <p className="usr-q">Already have an account? <Link to="./login">Login now</Link></p>}
      {redirect && <Redirect to="/woofer"/>}
    </div>
  )
}
