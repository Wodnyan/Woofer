import React from 'react';
import img  from "./imgs/astronaut.svg"
export default function UserInfo(props){
    const {username, description} = props;
  return (
    <div className="user-info-container">
      <div className="user__prof-pic">
        <img src={img} style={{width: "120px"}}/>
      </div>
      <div className="user__username">
        {username}
      </div>
      <div className="user__description"> 
        {description}
      </div>
    </div>
  )
}
