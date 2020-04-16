import React from "react";

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
    console.log(url);
    // const post = await fetch(url,{
    //   method: "POST",
    //   header: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(this.state)
    // })
    // const resp = post.json();
    // console.log(resp);
  }
  render(){
    const {title, url} = this.props
    return(
    <>
    <h1>
      {title}
    </h1>
      <form onSubmit={(e)=>{this.handleSubmit(e, url)}}>
        <input type="text" name="username" onChange={this.handleInputChange} value={this.state.username}></input>
        <input type="password" name="password" onChange={this.handleInputChange} value={this.state.password}></input>
        <button type="submit">{title}</button>
      </form>
    </>
  )
  }
}
