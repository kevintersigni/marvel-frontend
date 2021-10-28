import React, { useEffect, useState } from "react";

import axios from "axios";
import * as qs from "qs";
import Cookies from "js-cookie";

import Pagination from "../../Components/Pagination/Pagination";
import SearchBox from "../../Components/SearchBox/SearchBox";

import CharacterCard from "../../Components/CharacterCard/CharacterCard";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";

import "./Characters.css";

const Characters = () => {
  const [cookieCharactersId, setCookieCharactersId] = useState(
    Cookies.get("favouritesCharactersId")
      ? JSON.parse(Cookies.get("favouritesCharactersId"))
      : []
  );

  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState();
  const [skip, setSkip] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState("");

  const numberOfLinks = Math.ceil(count / limit);

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = qs.stringify({
        name: search,
        limit: limit,
        skip: skip,
      });

      const response = await axios.get(
        `https://wikimarvel.herokuapp.com/characters?${queryParams}`
      );

      setCharacters(response.data.results);
      setLimit(response.data.limit);
      setCount(response.data.count);
      setIsLoading(false);
    };
    fetchData();
  }, [skip, limit, search, cookieCharactersId]);

  return !isLoading ? (
    <div className="charactersContainer">
      <h1>CHARACTERS LIST</h1>
      <p className="characters-count">{count} characters so far...</p>
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

      <div className="characters">
        {characters.map((character, index) => (
          <CharacterCard
            key={index}
            character={character}
            cookieCharactersId={cookieCharactersId}
            setCookieCharactersId={setCookieCharactersId}
          />
        ))}
      </div>
      <ScrollToTop />
    </div>
  ) : (
    <div>chargement</div>
  );
};

export default Characters;
