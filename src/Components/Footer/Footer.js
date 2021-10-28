import React from "react";
import "./Footer.css";
import Reacteur from "../../assets/images/lereacteur-icon.png";

const Footer = () => {
  return (
    <footer>
      <p>
        <span>Made by</span>
        <a
          href="https://www.notion.so/Kevin-Tersigni-7d99ee45f8264aef9444437e32e6d0eb"
          target="_blank"
          rel="noreferrer"
        >
          Kevin Tersigni
        </a>
        <span>at</span>
        <a href="https://www.lereacteur.io/" target="_blank" rel="noreferrer">
          <img src={Reacteur} alt="icone du Recateur" />
          <span>Le Reacteur</span>
        </a>
        <span>- 2021</span>
      </p>
    </footer>
  );
};

export default Footer;
