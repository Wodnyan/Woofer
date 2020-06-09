import React, {useState} from 'react';
import useGetProfilePicture from "../../../hooks/useGetProfilePicture.jsx"
import {Link} from "react-router-dom"
import "./style/Content.scss"
import img from "../imgs/astronaut.svg"

export default function Content({
  woof,
  user,
  postedOn,
  onClick,
  hasComments
}){
  const profilePic = useGetProfilePicture(user)
  return(
    <div className="woof-container">
      <Link to={`/user/${user}`}>
        <span className="woof__profile-pic">
          <img src={profilePic ? profilePic : img} alt="profile picture"></img>
        </span>
      </Link>
      <span className="woof__user">{user}</span>
      <span className="woof__date">{postedOn}</span>
      <p className="woof__content">{woof}</p>
      { hasComments && <button onClick={onClick}>Comments</button>}
    </div>
  )
}
