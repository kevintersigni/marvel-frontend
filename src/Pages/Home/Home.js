import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  return (
    <div className="homeContainer">
      <h1>Bienvenue sur le WikiMarvel</h1>

      <div className="chooseContainer">
        <Link to="/characters" className="navBoxContainer">
          <h2 className="navBoxTitle">CHARACTERS</h2>
        </Link>
        <Link to="/comics" className="navBoxContainer">
          <h2 className="navBoxTitle">COMICS</h2>
        </Link>
      </div>
    </div>
  );
};

export default Home;
