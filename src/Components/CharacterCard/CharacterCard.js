import React from "react";
import { useHistory } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NoCharacter from "../../assets/images/characters_opt_bw.jpg";

import "./CharacterCard.css";

const CharacterCard = ({ character, cookieCharactersId }) => {
  const history = useHistory();

  const imgSrc = Object.values(character.thumbnail).join(".");
  const imgOrigin =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

  return (
    <div className="characterCard">
      <div
        onClick={() => {
          history.push(`/character/${character._id}`);
        }}
      >
        <img
          src={imgSrc === imgOrigin ? NoCharacter : imgSrc}
          alt="couv character"
        />
        <div className="favBox">
          <div className="tooltip">
            {cookieCharactersId.indexOf(character._id) !== -1 && (
              <>
                <FontAwesomeIcon icon="heart" />
                <span className="tooltipText">In your favs !</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="characterNameContainer">
        <div className="characterName">{character.name}</div>
      </div>
    </div>
  );
};

export default CharacterCard;
