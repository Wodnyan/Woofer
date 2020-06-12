import React, {useEffect, useState} from 'react'
import Content from "../woof/Content.jsx"
import Button from "../button/Button.jsx"
import CharCounter from "../char_counter/CharCounter.jsx"
import {CircularLoader} from "../load/Load.jsx"
import useSendTextAreaValue from "../../../hooks/useSendTextAreaValue.jsx"
//Import charcounter
import "./Comments.scss"
import axios from "axios"
export default function Comments({
	woofId,
	innerRef
}) {
	const LOAD_MORE_BY = 4;
	const [fromTo, setFromTo] = useState([0, LOAD_MORE_BY])
	const [comments, setComments] = useState([]);
	const [displayLoader, setDisplayLoader] = useState(true);
	const {textAreaValue, handleClick, handleChange} = useSendTextAreaValue()
	const COMMENT_LIMIT = 150;
	const POST_ENDPOINT = "http://localhost:3000/api/comments"

	//Initial load
	useEffect(() => {
		const CancelToken = axios.CancelToken;
		const source = CancelToken.source()
		axios
			.get(`http://localhost:3000/api/comments?woofId=${woofId}&from=${fromTo[0]}&to=${fromTo[1]}`, {
				cancelToken:source.token
			})
			.then(resp => {
				setDisplayLoader(prev => [prev[1], prev[1] + LOAD_MORE_BY])
				setDisplayLoader(false);
				setComments(resp.data)
			})
		return () => {
			return source.cancel()
		}
	}, [])

	function loadMore() {
    setFromTo(prevState => [prevState[1], prevState[1] + LOAD_MORE_BY])
    axios
    	.get(`http://localhost:3000/api/comments?woofId=${woofId}&from=${fromTo[0]}&to=${fromTo[1]}`)
      .then(resp => {
        setComments(prevState => [...prevState, ...resp.data]) 
      })
	}

	const comment = {
		comment: textAreaValue,
		postedOn: new Date().toLocaleString(),
		woofId: woofId
	}

	const renderedComments = comments.map((comment, index) => {
		return <Content key={index} woof={comment.comment} user={comment.username} postedOn={comment.postedOn}/>
	})

	return (
		<div ref={innerRef} className="comments-container">
			<input type="text" value={textAreaValue} onChange={(e) => handleChange(e)} placeholder="Write a comment"></input>
			<button onClick={() => handleClick(POST_ENDPOINT, comment, COMMENT_LIMIT)}>Comment</button>
			<CharCounter 
				length={textAreaValue.length} 
				limit={COMMENT_LIMIT}
			/>
			<div className="comments">
				{!displayLoader && comments.length === 0 && "No comments"}
				{displayLoader ? <CircularLoader /> : renderedComments}
				{!displayLoader && <Button buttonText="Load More" onClick={loadMore} />}
			</div>
		</div>
	)
}