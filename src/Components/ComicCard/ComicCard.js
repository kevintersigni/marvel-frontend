import React from "react";
import Cookies from "js-cookie";

import NoComic from "../../assets/images/comics_opt_bw.jpg";

import "./ComicCard.css";

const ComicCard = ({
  comic,
  cookieComics,
  setCookieComics,
  cookieComicsId,
  setCookieComicsId,
}) => {
  const imgSrc = Object.values(comic.thumbnail).join(".");
  const imgOrigin =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

  const handleAddFavComic = () => {
    let addFav = {
      name: comic.title,
      id: comic._id,
      img: imgSrc === imgOrigin ? NoComic : imgSrc,
    };

    if (cookieComics.length > 0) {
      let comicCookie = JSON.parse(cookieComics);
      let newFav = [...comicCookie];

      newFav.push(addFav);

      Cookies.remove("favouritesComics");
      Cookies.set("favouritesComics", JSON.stringify(newFav));
      setCookieComics(JSON.stringify(newFav));

      let newFavId = [...cookieComicsId];
      newFavId.push(comic._id);

      Cookies.remove("favouritesComicsId");
      Cookies.set("favouritesComicsId", JSON.stringify(newFavId));
      setCookieComicsId(newFavId);
    } else {
      let newFav = [];
      newFav.push(addFav);

      Cookies.remove("favouritesComics");
      Cookies.set("favouritesComics", JSON.stringify(newFav));
      setCookieComics(JSON.stringify(newFav));

      let newFavId = [];
      newFavId.push(comic._id);
      Cookies.remove("favouritesComicsId");
      Cookies.set("favouritesComicsId", JSON.stringify(newFavId));
      setCookieComicsId(newFavId);
    }
  };

  const handleRemoveFavComic = () => {
    let comicCookie = JSON.parse(cookieComics);
    let newFav = [...comicCookie];
    let newFavId = [...cookieComicsId];

    for (let i = 0; i < newFav.length; i++) {
      if (newFav[i].id === comic._id) {
        newFav.splice(newFav.indexOf(newFav[i]), 1);
      }
    }

    newFavId.splice(cookieComicsId.indexOf(comic._id), 1);

    Cookies.remove("favouritesComics");
    Cookies.remove("favouritesComicsId");

    if (newFav.length > 0) {
      Cookies.set("favouritesComics", JSON.stringify(newFav));
      Cookies.set("favouritesComicsId", JSON.stringify(newFavId));
    }

    setCookieComics(newFav);
    setCookieComicsId(newFavId);
  };

  return (
    <div className="comicCard">
      <div className="comicImagecontainer">
        <img src={imgSrc === imgOrigin ? NoComic : imgSrc} alt="comicImage" />
      </div>

      <div className="comicDetails" id={comic._id}>
        <h2>{comic.title}</h2>

        {comic.description ? (
          <p>{comic.description}</p>
        ) : (
          <p className="italic">Missing description</p>
        )}

        <div className="button-container">
          {cookieComicsId.indexOf(comic._id) !== -1 ? (
            <button onClick={handleRemoveFavComic}>
              Remove from your favs
            </button>
          ) : (
            <button onClick={handleAddFavComic}>Add to your favs</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComicCard;
