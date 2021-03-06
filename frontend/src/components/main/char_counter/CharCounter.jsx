import React from "react"
import styled from "styled-components"
const CharCounterContainer = styled.div`
	color: ${props => props.length >= props.limit ? "red" : "inherit"};
`
export default function CharCounter({
	className,
	limit,
	length
}) {
  return <CharCounterContainer className={className} length={length} limit={limit}>{length} / {limit}</CharCounterContainer>
}
