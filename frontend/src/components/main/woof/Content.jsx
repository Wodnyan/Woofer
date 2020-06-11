import React, {useState} from 'react';
import {Link} from "react-router-dom"
import "./style/Content.scss"

export default function Content({
  woof,
  user,
  postedOn,
  onClick,
  hasComments
}){
  // const profilePic = useGetProfilePicture(user)
  return(
    <div className="woof-container">
      <Link to={`/user/${user}`}>
        <span className="woof__profile-pic">
          <img src={`http://localhost:3000/user/profile-picture?username=${user}`} alt="profile picture"></img>
        </span>
      </Link>
      <span className="woof__user">{user}</span>
      <span className="woof__date">{postedOn}</span>
      <p className="woof__content">{woof}</p>
      { hasComments && <button onClick={onClick}>Comments</button>}
    </div>
  )
}
