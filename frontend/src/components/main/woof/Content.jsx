import React, {useState} from 'react';
import "./style/Content.scss"
import {Link} from "react-router-dom"
import profPic from "../imgs/astronaut.svg"
export default function Content(props){
  const {woof, user, postedOn} = props;
  return(
    <div className="woof-container">
      <Link to={`/user/${user}`}>
        <span className="woof__profile-pic">
          <img src={profPic} alt="profile picture"></img>
        </span>
      </Link>
      <span className="woof__user">{user}</span>
      <span className="woof__date">{postedOn}</span>
      <p className="woof__content">{woof}</p>
    </div>
  )
}
