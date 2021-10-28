import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Cookies from "js-cookie";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import "./App.css";

import Characters from "./Pages/Characters/Characters";
import Comics from "./Pages/Comics/Comics";
import Character from "./Pages/Character/Character";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Favorites from "./Pages/Favorites/Favorites";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart, faHeartBroken, faChevronUp, faChevronLeft);

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/characters">
          <Characters />
        </Route>
        <Route path="/character/:id">
          <Character />
        </Route>
        <Route path="/comics">
          <Comics />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
