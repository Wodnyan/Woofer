import React from "react"

export default function CharCounter(props) {
  const {limit, length} = props
  const limitExcededError = length >= limit ? {color: "red"} : {color: "inherit"}

  return <div style={limitExcededError}>{length} / {limit}</div>
}
