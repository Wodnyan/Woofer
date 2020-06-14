import React, {useState} from "react"
import "./Button.scss"

export default function Button({
	onClick,
	buttonText
}) {
	const [bounce, setBounce] = useState(false)
	function handleClick() {
		setBounce(true)
	}
	function handleAnimationEnd() {
		setBounce(false)
		onClick()
	}
	return (
		<button 
			onClick={handleClick}
			onAnimationEnd={handleAnimationEnd}
			className={bounce ? "button bounce" : "button"}
		>
			{buttonText}
		</button> 
	)
}