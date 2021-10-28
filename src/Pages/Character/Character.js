import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NoCharacter from "../../assets/images/characters_opt_bw.jpg";

import "./Character.css";

const Character = () => {
  const [cookieCharacters, setCookieCharacters] = useState(
    Cookies.get("favouritesCharacters") || []
  );
  const [cookieCharactersId, setCookieCharactersId] = useState(
    Cookies.get("favouritesCharactersId")
      ? JSON.parse(Cookies.get("favouritesCharactersId"))
      : []
  );

  const { id } = useParams();
  const [comics, setComics] = useState([]);
  const [character, setCharacter] = useState({});
  const [thumbnail, setThumbnail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const imgSrc = Object.values(thumbnail).join(".");
  const imgOrigin =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
  const history = useHistory();

  const handleAddFavCharacter = () => {
    let addFav = {
      name: character.name,
      id: character._id,
      img: Object.values(thumbnail).join("."),
    };

    if (cookieCharacters.length > 0) {
      let char = JSON.parse(cookieCharacters);
      let newFav = [...char];
      newFav.push(addFav);

      Cookies.remove("favouritesCharacters");
      Cookies.set("favouritesCharacters", JSON.stringify(newFav));
      setCookieCharacters(JSON.stringify(newFav));

      let newFavId = [...cookieCharactersId];
      newFavId.push(character._id);

      Cookies.remove("favouritesCharactersId");
      Cookies.set("favouritesCharactersId", JSON.stringify(newFavId));
      setCookieCharactersId(JSON.stringify(newFavId));
    } else {
      let newFav = [];
      newFav.push(addFav);

      Cookies.remove("favouritesCharacters");
      Cookies.set("favouritesCharacters", JSON.stringify(newFav));
      setCookieCharacters(JSON.stringify(newFav));

      let newFavId = [];
      newFavId.push(character._id);
      Cookies.remove("favouritesCharactersId");
      Cookies.set("favouritesCharactersId", JSON.stringify(newFavId));
      setCookieCharactersId(JSON.stringify(newFavId));
    }
  };

  const handleRemoveFavCharacter = () => {
    let char = JSON.parse(cookieCharacters);
    let newFav = [...char];
    let newFavId = [...cookieCharactersId];

    for (let i = 0; i < newFav.length; i++) {
      if (newFav[i].id === character._id) {
        newFav.splice(newFav.indexOf(newFav[i]), 1);
      }
    }

    newFavId.splice(cookieCharactersId.indexOf(character._id), 1);

    Cookies.remove("favouritesCharactersId");
    Cookies.remove("favouritesCharacters");

    if (newFav.length > 0) {
      Cookies.set("favouritesCharactersId", newFavId);
      Cookies.set("favouritesCharacters", JSON.stringify(newFav));
    }
    setCookieCharactersId(newFavId);
    setCookieCharacters(newFav);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://wikimarvel.herokuapp.com/character/${id}`
      );

      setIsLoading(false);
      setCharacter(response.data);
      setComics(response.data.comics);
      setThumbnail(response.data.thumbnail);
    };
    fetchData();
  }, [id, cookieCharactersId, cookieCharacters]);

  return (
    <div>
      {isLoading ? (
        <div>chargement...</div>
      ) : (
        <div className="character-container">
          <div className="character-details">
            <div className="img-container">
              <img
                src={imgSrc === imgOrigin ? NoCharacter : imgSrc}
                alt={`couv de ${character.name}`}
              />
              <button
                className="goBack"
                onClick={() => {
                  history.goBack();
                }}
              >
                <FontAwesomeIcon icon="chevron-left" />
                <span>Back</span>
              </button>
            </div>

            <div className="detail-container">
              <div>
                <h1>{character.name}</h1>
              </div>
              <p>{character.description}</p>
              <div className="button-container">
                {cookieCharactersId &&
                cookieCharactersId.indexOf(character._id) !== -1 ? (
                  <button onClick={handleRemoveFavCharacter}>
                    Remove from favs
                  </button>
                ) : (
                  <button onClick={handleAddFavCharacter}>
                    Add to your favs
                  </button>
                )}
              </div>
            </div>
          </div>
          <h2>{character.name} appears in these comics :</h2>

          <div className="comics-list">
            {comics.map((comic, index) => (
              <div className="comic-item" key={index}>
                <figure>
                  <img
                    src={Object.values(comic.thumbnail).join(".")}
                    alt={`couv de ${comic.title}`}
                  />
                  <figcaption>{comic.title}</figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Character;
