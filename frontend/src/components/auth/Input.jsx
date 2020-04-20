import React from "react";
import style from "./styles/Input.scss"
import {Link} from "react-router-dom";
import postData from "../../_functions/postF.js"
class User{
  constructor(un, pw){
    this.username = un;
    this.password = pw;
  }
}
export default class Input extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(e){
    const target = e.target.name;
    const value = e.target.value;
    this.setState({
      [target]: value
    })
  }
  async handleSubmit(e, url){
    e.preventDefault();
    const {username, password} = this.state;
    if(!username || !password){
      this.setState({
        error: "Enter username and password"
      })
      return;
    }
    const user = new User(username, password);
    const post = await postData(user, url);
    console.log(post);
    if(post.error){
      this.setState({
        error: post.error
      })
    }
    else{
      this.setState({
        error: ""
      })
      console.log(post);
    }
  }
  render(){
    const {title, url} = this.props;
    const {username, password, error} = this.state
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
    </div>
  )
  // <a href="http://localhost:3001/account/login">Login now!</a>
  }
}
