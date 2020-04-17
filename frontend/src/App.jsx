import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Login from "./components/auth/Login.jsx";
import SignUp from "./components/auth/SignUp.jsx";
function App() {
  return (
    <div>
      <Login/>
      <SignUp/>
    </div>
  );
}

export default App;
