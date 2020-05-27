import React from "react"
import styled from "styled-components"
export default function NoContent() {
  const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `
  return (
    <>
      <MessageContainer>
        <h1>Oh oh</h1>
        <p>It seems like you don't have any woofs</p>
      </MessageContainer>
    </>
  )
}

