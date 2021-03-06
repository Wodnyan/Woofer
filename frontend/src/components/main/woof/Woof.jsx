import React, {useState} from "react"
import useDetectClickOutside from "../../../hooks/useDetectClickOutside.jsx"
import Content from "./Content.jsx"
import Comments from "../comments/Comments.jsx"
export default function Woof({
	woof,
	user,
	postedOn,
	woofId
}) {

	const {ref, display, setDisplay} = useDetectClickOutside(false)
	return (
		<>
			{display && <Comments innerRef={ref} woofId={woofId} closeComments={() => setDisplay(false)}/>}
			<Content 
				woof={woof} 
				user={user} 
				postedOn={postedOn} 
				onClick={() => setDisplay(!display)}
				hasComments={true}
			/>
		</>
	)
}