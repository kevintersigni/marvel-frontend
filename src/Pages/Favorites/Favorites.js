import React, { useState } from "react";
import { useHistory } from "react-router";
import Cookies from "js-cookie";

import("./Favorites.css");

const Favorites = () => {
  const [cookieCharacters, setCookieCharacters] = useState(
    Cookies.get("favouritesCharacters")
      ? JSON.parse(Cookies.get("favouritesCharacters"))
      : []
  );

  const [cookieCharactersId, setCookieCharactersId] = useState(
    Cookies.get("favouritesCharactersId") || []
  );

  const [cookieComics, setCookieComics] = useState(
    Cookies.get("favouritesComics")
      ? JSON.parse(Cookies.get("favouritesComics"))
      : []
  );
  const [cookieComicsId, setCookieComicsId] = useState(
    Cookies.get("favouritesComicsId") || []
  );

  const history = useHistory();

  const handleRemoveFavCharacter = (characterId) => {
    let newFav = [...cookieCharacters];

    let newFavId = [...cookieCharactersId];

    for (let i = 0; i < newFav.length; i++) {
      if (newFav[i].id === characterId) {
        newFav.splice(newFav.indexOf(newFav[i]), 1);
      }
    }

    newFavId.splice(cookieCharactersId.indexOf(characterId), 1);

    Cookies.remove("favouritesCharactersId");
    Cookies.remove("favouritesCharacters");

    if (newFav.length > 0) {
      Cookies.set("favouritesCharactersId", newFavId);
      Cookies.set("favouritesCharacters", JSON.stringify(newFav));
    }
    setCookieCharactersId(newFavId);
    setCookieCharacters(newFav);
  };
  const handleRemoveFavComic = (comicId) => {
    let newFav = [...cookieComics];
    let newFavId = [...cookieComicsId];

    for (let i = 0; i < newFav.length; i++) {
      if (newFav[i].id === comicId) {
        newFav.splice(newFav.indexOf(newFav[i]), 1);
      }
    }

    newFavId.splice(cookieComicsId.indexOf(comicId), 1);

    Cookies.remove("favouritesComicsId");
    Cookies.remove("favouritesComics");

    if (newFav.length > 0) {
      Cookies.set("favouritesComicsId", newFavId);
      Cookies.set("favouritesComics", JSON.stringify(newFav));
    }

    setCookieComicsId(newFavId);
    setCookieComics(newFav);
  };

  const handleRemoveAllFavCharacters = () => {
    Cookies.remove("favouritesCharacters");
    Cookies.remove("favouritesCharactersId");
    setCookieCharacters([]);
    setCookieCharactersId();
  };
  const handleRemoveAllFavComics = () => {
    Cookies.remove("favouritesComics");
    Cookies.remove("favouritesComicsId");
    setCookieComics([]);
    setCookieComicsId();
  };

  return (
    <div className="favoritesContainer">
      <div className="comicsFav-container">
        <h2>My comics favs</h2>

        {cookieComics.length > 0 ? (
          <>
            <div className="comicsFav-list">
              {cookieComics.map((comic, index) => {
                return (
                  <div className="comic-card-fav" key={index}>
                    <figure>
                      <img src={comic.img} alt="comic couv" />
                      <figcaption>{comic.name}</figcaption>
                    </figure>
                    <button
                      className="red"
                      onClick={() => {
                        handleRemoveFavComic(comic.id);
                      }}
                    >
                      Remove it
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="button-container">
              <button className="red" onClick={handleRemoveAllFavComics}>
                Flush it all !
              </button>
            </div>
          </>
        ) : (
          <div>
            <p>Your list is empty !</p>
          </div>
        )}
      </div>

      <div className="charactersFav-container">
        <h2>My characters favs</h2>
        {cookieCharacters.length > 0 ? (
          <>
            <div className="charactersFav-list">
              {cookieCharacters.map((character, index) => {
                return (
                  <div className="character-card-fav" key={index}>
                    <figure>
                      <img src={character.img} alt="character couv" />
                      <figcaption
                        onClick={() => {
                          history.push(`/character/${character.id}`);
                        }}
                      >
                        {character.name}
                      </figcaption>
                    </figure>

                    <button
                      onClick={() => {
                        history.push(`/character/${character.id}`);
                      }}
                    >
                      See the profile
                    </button>

                    <button
                      className="red"
                      onClick={() => {
                        handleRemoveFavCharacter(character.id);
                      }}
                    >
                      Remove it
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="button-container">
              <button className="red" onClick={handleRemoveAllFavCharacters}>
                Flush it all !
              </button>
            </div>
          </>
        ) : (
          <div>
            <p>Your list is empty !</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
