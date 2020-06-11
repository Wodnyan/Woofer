import React, {useEffect, useState} from 'react'
import Content from "../woof/Content.jsx"
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
	const [comments, setComments] = useState([]);
	const [displayLoader, setDisplayLoader] = useState(true);
	const {textAreaValue, handleClick, handleChange} = useSendTextAreaValue()
	const COMMENT_LIMIT = 150;
	const ENDPOINT = "http://localhost:3000/api/comments"

	//Fetch Comments
	useEffect(() => {
		const CancelToken = axios.CancelToken;
		const source = CancelToken.source()
		axios
			.get(`http://localhost:3000/api/comments?woofId=${woofId}`, {
				cancelToken:source.token
			})
			.then(resp => {
				setDisplayLoader(false);
				setComments(resp.data)
			})
		return () => {
			return source.cancel()
		}
	}, [])

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
			<button onClick={() => handleClick(ENDPOINT, comment, COMMENT_LIMIT)}>Comment</button>
			<CharCounter 
				length={textAreaValue.length} 
				limit={COMMENT_LIMIT}
			/>
			<div className="comments">
				{!displayLoader && comments.length === 0 && "No comments" }
				{displayLoader ? <CircularLoader /> : renderedComments}
			</div>
		</div>
	)
}