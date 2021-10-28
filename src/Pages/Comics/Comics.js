import React, { useEffect, useState } from "react";
import * as qs from "qs";
import axios from "axios";
import Cookies from "js-cookie";

import Pagination from "../../Components/Pagination/Pagination";
import SearchBox from "../../Components/SearchBox/SearchBox";
import ComicCard from "../../Components/ComicCard/ComicCard";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import LoadSpinner from "../../Components/LoadSpinner/LoadSpinner";

import "./Comics.css";

const Comics = () => {
  const [cookieComics, setCookieComics] = useState(
    Cookies.get("favouritesComics") || []
  );

  const [cookieComicsId, setCookieComicsId] = useState(
    Cookies.get("favouritesComicsId")
      ? JSON.parse(Cookies.get("favouritesComicsId"))
      : []
  );

  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState();
  const [skip, setSkip] = useState(0);
  const [comics, setComics] = useState([]);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState("");
  const numberOfLinks = Math.ceil(count / limit);

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = qs.stringify({
        title: search,
        limit: limit,
        skip: skip,
      });

      try {
        const response = await axios.get(
          `https://wikimarvel.herokuapp.com/comics?${queryParams}`
        );

        setComics(response.data.results);
        setLimit(response.data.limit);
        setCount(response.data.count);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [skip, limit, search, cookieComicsId]);

  return !isLoading ? (
    <div className="comicsContainer">
      <h1>COMICS LIST</h1>
      <p className="comics-count">{count} comics so far...</p>

      <SearchBox
        setSearch={setSearch}
        setLimit={setLimit}
        limit={limit}
        setSkip={setSkip}
      />

      <Pagination
        setSkip={setSkip}
        limit={limit}
        numberOfLinks={numberOfLinks}
      />

      <div className="comics">
        {comics.map((comic, index) => (
          <ComicCard
            key={index}
            comic={comic}
            cookieComics={cookieComics}
            setCookieComics={setCookieComics}
            cookieComicsId={cookieComicsId}
            setCookieComicsId={setCookieComicsId}
          />
        ))}
        <ScrollToTop />
      </div>
    </div>
  ) : (
    <LoadSpinner />
  );
};

export default Comics;
