import React, {useState, useEffect} from 'react'
import {Redirect} from "react-router-dom"
import "./style/load-more.scss"
import Woof from "./Woof.jsx"
import Load, {CircularLoader} from "../load/Load.jsx"
import UserInfo from "../user_info/UserInfo.jsx"
import NoContent from "../no_content/NoContent.jsx"
import axios from "axios"

export default function MyWoofer(props){
  const LOAD_MORE_BY = 50; //The amount of content to be loaded
  const {username} = props
  const [redirect, setRedirect] = useState(false);
  const [displayLoader, setDisplayLoader] = useState(false);
  //Load more State
  const [hasNextPage, setHasNextPage] = useState(true)
  const [fromTo, setFromTo] = useState([0, LOAD_MORE_BY])
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
          if(resp.data.length < LOAD_MORE_BY - 1) setHasNextPage(false)
          setWoof(resp.data)
          setFromTo(prevState => [prevState[1] + 1, prevState[1] + LOAD_MORE_BY])
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
    setDisplayLoader(true)
    setHasNextPage(false)
    setFromTo(prevState => [prevState[1], prevState[1] + LOAD_MORE_BY])
    axios
      .get(`http://localhost:3000/api/woofer?username=${username}&from=${fromTo[0]}&to=${fromTo[1]}`)
      .then(resp => {
        setWoof(prevState => woof.concat(resp.data))
        setHasNextPage(true)
        setDisplayLoader(false)
        if(resp.data.length  < LOAD_MORE_BY - 1) setHasNextPage(false)
      })
  }
  //Change the name of this variable
  const temp = woof.map((ss)=>{
    return <Woof key={ss._id} woofId={ss._id} woof={ss.woof} user={ss.user} postedOn={ss.postedOn}/>;
  })
  if(redirect) return <Redirect exact to="/404"/>
  if(woof.length === 0 && hasNextPage) return <Load />
  return (
    <>
      <UserInfo username={props.username} />
      {woof.length === 0 && !hasNextPage && <NoContent />}
      {temp}
      {displayLoader && <div className="load-more-circular-loader"><CircularLoader /></div>}
      {hasNextPage && <button className="load-more-btn" onClick={loadMore}>Load more</button>}
    </>
  )
}
