import React from 'react';
import {Link} from "react-router-dom";
import notFoundSvg from "./page-not-found.svg"
export default function NotFound(){
  return(
    <div className="not-found">
      <h1>404</h1>
      <p>
        We cannot seem to find the page you were looking for, you can return to the home page with the link below
      </p>
      <Link to="/">Home page</Link>
      <img src={notFoundSvg} alt="Not Found Svg"/>
    </div>
  )
}
