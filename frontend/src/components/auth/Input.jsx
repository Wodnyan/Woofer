import React from "react";
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
    const user = new User(username, password)
    const post = await fetch(url,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    const resp = await post.json();
    this.setState({
      error: resp.error
    })
  }
  render(){
    const {title, url} = this.props
    return(
    <>
    <h1>
      {title}
    </h1>
      <form onSubmit={(e)=>{this.handleSubmit(e, url)}}>
        <h1 style={{color: "red"}}>{this.state.error}</h1>
        <input type="text" name="username" onChange={this.handleInputChange} value={this.state.username}></input>
        <input type="password" name="password" onChange={this.handleInputChange} value={this.state.password}></input>
        <button type="submit">{title}</button>
      </form>
    </>
  )
  }
}
