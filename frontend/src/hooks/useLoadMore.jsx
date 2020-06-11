import React, {useState, useEffect} from "react"
import axios from "axios"

export default function useLoadMore({
	LOAD_MORE_BY=100,
	setDisplayLoader,
	URL
}) {
	const [content, setContent] = useState([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [fromTo, setFromTo] = useState([0, LOAD_MORE_BY])
  function loadMore() {
    setDisplayLoader(true)
    setHasNextPage(false)
    setFromTo(prevState => [prevState[1], prevState[1] + LOAD_MORE_BY])
    axios
      .get(URL)
      .then(resp => {
        setContent(prevState => content.concat(resp.data))
        setHasNextPage(true)
        setDisplayLoader(false)
        if(resp.data.length  < LOAD_MORE_BY - 1) setHasNextPage(false)
      })	
  }
	return {content, hasNextPage};
}