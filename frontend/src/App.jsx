import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
//Style
import style from "./App.scss"
//Components
import Login from "./components/auth/Login.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import Header from "./components/main/nav/Header.jsx";
import Nav from "./components/main/nav/Nav.jsx";
import ProtectedComponent from "./components/ProtectedComponent.jsx";
import AllWoofer from "./components/main/woof/AllWoofer.jsx"

function App() {
  const [username, setUsername] = useState("");
  const [auth, setAuth] = useState(false);
  const propAuth = ()=>{
    setAuth(true);
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ProtectedComponent isAuth={auth}>
            <Header>
              <h1 className="header__title">Woofer</h1>
              <Nav/>
            </Header>
          </ProtectedComponent>
        </Route>
        <Route path="/woofer">
          <ProtectedComponent isAuth={auth}>
            {username}
            <Header>
              <h1 className="header__title">Woofer</h1>
              <Nav username={username}/>
            </Header>
            <AllWoofer />
          </ProtectedComponent>
        </Route>
        <Route path="/account/sign-up">
          <SignUp setUsername={setUsername} username={username} auth={propAuth}/>
        </Route>
        <Route path="/account/login">
          <Login setUsername={setUsername} username={username} auth={propAuth}/>
        </Route>
        <Route path="*" component={() => "404 not found"}/>
      </Switch>
    </Router>
  );
}

export default App;
