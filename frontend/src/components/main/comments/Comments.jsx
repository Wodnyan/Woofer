import React, {useEffect, useState} from 'react'
import Content from "../woof/Content.jsx"
import useSendTextAreaValue from "../../../hooks/useSendTextAreaValue.jsx"
import useDetectClickOutside from "../../../hooks/useDetectClickOutside.jsx"
//Import charcounter
import "./Comments.scss"
import axios from "axios"
export default function Comments({
	woofId,
	innerRef
}) {
	const [comments, setComments] = useState([]);
	const [loader, setLoader] = useState(true);
	const {textAreaValue, handleClick, handleChange} = useSendTextAreaValue()
	const COMMENT_LIMIT = 250;
	const URL = "http://localhost:3000/api/comments"
	//Fetch Comments
	useEffect(() => {
		const CancelToken = axios.CancelToken;
		const source = CancelToken.source()
		axios
			.get(`http://localhost:3000/api/comments?woofId=${woofId}`, {
				cancelToken:source.token
			})
			.then(resp => {
				console.log(resp)
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
	return (
		<div ref={innerRef} className="comments-container">
			<input type="text" value={textAreaValue} onChange={(e) => handleChange(e)} placeholder="Write a comment"></input>
			<button onClick={() => handleClick(URL, comment, COMMENT_LIMIT)}>Comment</button>
			<div className="comments">
				{comments.map((comment, index) => {
					return <Content key={index} woof={comment.comment} user={comment.username} postedOn={comment.postedOn}/>
				})}
			</div>
		</div>
	)
}