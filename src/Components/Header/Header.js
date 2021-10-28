import React from "react";
import { Link, NavLink } from "react-router-dom";

import Logo from "../../assets/images/logo.svg";

import "./Header.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <header>
      <div>
        <Link to="/">
          <img src={Logo} alt="logo Marvel" />
        </Link>
      </div>
      <nav className="navbar">
        <NavLink to="/characters" activeClassName="active">
          CHARACTERS
        </NavLink>
        <NavLink to="/comics" activeClassName="active">
          COMICS
        </NavLink>
        <NavLink to="/favorites">
          <FontAwesomeIcon icon="heart" />
          <span>FAVOURITES</span>
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
