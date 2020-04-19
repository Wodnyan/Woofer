import React from 'react';
import style from "./App.scss"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Login from "./components/auth/Login.jsx";
import SignUp from "./components/auth/SignUp.jsx";
function App() {
  return (
    <>
    <SignUp/>
      <Login/>
    </>
  );
}

export default App;
