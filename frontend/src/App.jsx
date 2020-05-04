import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import axios from "axios"
//Style
import style from "./App.scss"
//Components
import Login from "./components/auth/Login.jsx"
import SignUp from "./components/auth/SignUp.jsx"
import Header from "./components/main/nav/Header.jsx"
import Nav from "./components/main/nav/Nav.jsx"
import ProtectedComponent from "./components/ProtectedComponent.jsx"
import AllWoofer from "./components/main/woof/AllWoofer.jsx"
import MyWoofer from "./components/main/woof/MyWoofer.jsx"
import NotFound from "./components/main/not_found/NotFound.jsx"
import LandingPage from "./components/main/landing_page/LandingPage.jsx"

function App() {
  const [username, setUsername] = useState("USER");
  const [auth, setAuth] = useState(false);
  return (
    <Router>
      <Switch>
        <Route exact path="/dev">

        </Route>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/woofer">
          <ProtectedComponent auth={auth} setAuth={setAuth} setUsername={setUsername}>
            <Header>
              {username}
              <h1 className="header__title">Woofer</h1>
              <Nav username={username} type={"My Woofs"} />
            </Header>
            <section className="woof-section">
              <AllWoofer />
            </section>
          </ProtectedComponent>
        </Route>
        <Route path="/my-woofs">
          <ProtectedComponent auth={auth} setAuth={setAuth} setUsername={setUsername}>
            <Header>
              {username}
              <h1 className="header__title">Woofer</h1>
              <Nav username={username} type={"All Woofs"} />
            </Header>
            <section className="woof-section">
              <MyWoofer username={username} />
            </section>
          </ProtectedComponent>
        </Route>
        <Route exact path="/account/sign-up">
          <SignUp setUsername={setUsername} username={username} auth={setAuth} />
        </Route>
        <Route exact path="/account/login">
          <Login setUsername={setUsername} username={username} auth={setAuth} />
        </Route>
        <Route path="*" render={(props)=> <NotFound />} />
      </Switch>
    </Router>
  );
}

export default App;
