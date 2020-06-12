import React from "react"
import "./Button.scss"

export default function Button({
	onClick,
	buttonText
}) {
	return <button className="button" onClick={onClick}>{buttonText}</button> 
}