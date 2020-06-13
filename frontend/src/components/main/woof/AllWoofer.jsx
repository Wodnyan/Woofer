import React, {useState, useEffect} from 'react'
import Woof from "./Woof.jsx"
import Button from "../button/Button.jsx"
import Load, {CircularLoader} from "../load/Load.jsx"
import axios from "axios"

export default function AllWoofer(props){
  const LOAD_MORE_BY = 50; //The amount of content to be loaded
  //Data
  const [woof, setWoof] = useState([]);
  //Load more State
  const [hasNextPage, setHasNextPage] = useState(true)
  const [fromTo, setFromTo] = useState([0, LOAD_MORE_BY])
  const [displayLoader, setDisplayLoader] = useState(false);
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
        setFromTo(prevState => [prevState[1], prevState[1] + LOAD_MORE_BY])
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
    setDisplayLoader(true)
    setHasNextPage(false)
    setFromTo(prevState => [prevState[1], prevState[1] + LOAD_MORE_BY])
    axios
      .get(`http://localhost:3000/api/woofer?from=${fromTo[0]}&to=${fromTo[1]}`)
      .then(resp => {
        setWoof(prevState => [...prevState, ...resp.data]) 
        setHasNextPage(true)
        setDisplayLoader(false)
        if(resp.data.length  < LOAD_MORE_BY - 1) setHasNextPage(false)
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
        {displayLoader && <div className="load-more-circular-loader"><CircularLoader /></div>}
        {hasNextPage &&
          <Button 
            buttonText="Load More"
            onClick={loadMore}
          />
        }
      </>
    )
  }
}
