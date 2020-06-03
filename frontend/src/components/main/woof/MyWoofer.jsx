import React, {useState, useEffect} from 'react'
import {Redirect} from "react-router-dom"
import Content from "./Content.jsx"
import Load from "../load/Load.jsx"
import UserInfo from "../user_info/UserInfo.jsx"
import NoContent from "../no_content/NoContent.jsx"
import axios from "axios"

export default function MyWoofer(props){
  const loadMoreBy = 50; //The amount of content to be loaded
  const {username} = props
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  //Load more State
  const [hasNextPage, setHasNextPage] = useState(true)
  const [fromTo, setFromTo] = useState([0, loadMoreBy])
  //Data
  const [woof, setWoof] = useState([]);
  //Axios
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  useEffect(()=>{
    axios
      .get(`http://localhost:3000/api/woofer?username=${username}&from=${fromTo[0]}&to=${fromTo[1]}`, {
        cancelToken: source.token
      })
      .then((resp) => {
        if(resp.data) {
          if(resp.data.length < loadMoreBy - 1) setHasNextPage(false)
          setIsLoading(false)
          setWoof(resp.data)
          setFromTo(prevState => [prevState[1] + 1, prevState[1] + loadMoreBy])
        }
      })
      .catch((err) => {
        if(axios.isCancel(err)) return;
        else{
          console.log(err)
          setRedirect(true);
        }
      })
    return () => {
      source.cancel();
    }
  }, [])
  const loadMore = () => {
    setFromTo(prevState => [prevState[1], prevState[1] + loadMoreBy])
    axios
      .get(`http://localhost:3000/api/woofer?username=${username}&from=${fromTo[0]}&to=${fromTo[1]}`)
      .then(resp => {
        if(resp.data.length  < loadMoreBy - 1) setHasNextPage(false)
        setWoof(prevState => woof.concat(resp.data))
      })
  }
  //Change the name of this variable
  const temp = woof.map((ss)=>{
    return <Content key={ss._id} woof={ss.woof} user={ss.user} postedOn={ss.postedOn}/>;
  })
  if(redirect) return <Redirect exact to="/404"/>
  if(isLoading) return <Load />
  return (
    <>
      <UserInfo username={props.username} />
      {woof.length === 0 && <NoContent />}
      {temp}
      {hasNextPage && <button onClick={loadMore}>Load more</button>}
    </>
  )
}
