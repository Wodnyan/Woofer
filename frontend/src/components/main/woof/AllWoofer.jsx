import React, {useState, useEffect} from 'react'
import "./style/load-more.scss"
import Content from "./Content.jsx"
import Woof from "./Woof.jsx"
import Load from "../load/Load.jsx"
import axios from "axios"

export default function AllWoofer(props){
  const loadMoreBy = 50; //The amount of content to be loaded
  //Data
  const [woof, setWoof] = useState([]);
  //Load more State
  const [hasNextPage, setHasNextPage] = useState(true)
  const [fromTo, setFromTo] = useState([0, loadMoreBy])
  //Axios
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  //Get initial load from WOOF API
  useEffect(()=>{
    axios
      .get(`http://localhost:3000/api/woofer?from=${fromTo[0]}&to=${fromTo[1]}`, {
        cancelToken: source.token
      })
      .then((resp) => {
        setFromTo(prevState => [prevState[1], prevState[1] + loadMoreBy])
        setWoof(resp.data)
      })
      .catch((err) => {
        if(axios.isCancel(err)) return;
        console.error(err);
      })
      return () => {
        source.cancel();
      }
  }, [])
  const loadMore = () => {
    setFromTo(prevState => [prevState[1], prevState[1] + loadMoreBy])
    axios
      .get(`http://localhost:3000/api/woofer?from=${fromTo[0]}&to=${fromTo[1]}`)
      .then(resp => {
        if(resp.data.length  < loadMoreBy) setHasNextPage(false)
        setWoof(prevState => woof.concat(resp.data))
      })
  }
  const temp = woof.map((ss)=>{
    return <Woof key={ss._id} woofId={ss._id} woof={ss.woof} user={ss.user} postedOn={ss.postedOn}/>;
  })
  if(woof.length === 0) return <Load />
  else{
    return (
      <>
        {temp}
        {hasNextPage && <button className="load-more-btn" onClick={loadMore}>Load more</button>}
      </>
    )
  }
}
