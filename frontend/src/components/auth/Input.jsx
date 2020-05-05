import React from "react";
import {Link, Redirect} from "react-router-dom"
import style from "./styles/Input.scss"
import axios from "axios"

export default class Input extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      password: "",
      error: "",
      redirect: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e){
    const target = e.target.name;
    const value = e.target.value;
    if(target === "password"){
      this.setState({
        password: value
      })
    }
    else{
      this.props.setUsername(value);
    }
  }

  async handleSubmit(e, url){
    e.preventDefault();
    const {password} = this.state;
    const {username, auth} = this.props;
    //Check if username and password is typed
    if(!username || !password){
      this.setState({
        error: "Enter username and password"
      })
      return;
    }
    // TODO: Remove this comment for the build
    // if(password.length < 6) {
    //   this.setState({
    //     error: "Password needs to be longer than 6 characters"
    //   })
    //   return;
    // }
    axios
      .post(url, {
        username,
        password
      }, {
        withCredentials: true
      })
      .then((resp) => {
        const data = resp.data
        if(data.error) this.setState({error: resp.data.error})
        else{
          auth(true)
          this.setState({redirect: true})
        }
      })
  }

  render(){
    const {title, url} = this.props;
    const {username, password, error, redirect} = this.state
    return(
    <div className="input-container">
      <h1 className="input-title">
      🐶{title}🐶
      </h1>
      <form onSubmit={(e)=>{this.handleSubmit(e, url)}}>
        <label>
          <p className="input-header">Username</p>
          <input className="input input--username" type="text" name="username" onChange={this.handleInputChange} value={username}></input>
        </label>
        <label>
          <p className="input-header">Password</p>
          <input className="input input--password" type="password" name="password" onChange={this.handleInputChange} value={password}></input>
        </label>
        {error && <h1 className="input-error-msg">{this.state.error}</h1>}
        <button type="submit" className="submit-btn">{title}</button>
      </form>
      {title === "Login" ? <p className="usr-q">Not a member? <Link to="./sign-up">Sign up now</Link></p> : <p className="usr-q">Already have an account? <Link to="./login">Login now</Link></p>}
      {redirect && <Redirect to="/woofer"/>}
    </div>
  )
  }
}
