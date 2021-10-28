import React from "react";
import "./SearchBox.css";

const SearchBox = ({ setSearch, setLimit, limit, setSkip }) => {
  const handleSearch = (event) => {
    setSkip();

    const value = event.target.value;
    setSearch(value);
  };
  const handleDisplay = (event) => {
    const value = event.target.value;
    setLimit(value);
  };

  return (
    <div className="searchContainer">
      <div className="searchBar">
        <input
          type="search"
          placeholder="Search here..."
          onChange={handleSearch}
        ></input>
      </div>
      <div className="displayFilter">
        <label htmlFor="displayItems">Results per page</label>
        <select id="displayItems" value={limit} onChange={handleDisplay}>
          <option value="100">100</option>
          <option value="20">20</option>
          <option value="10">10</option>
          <option value="5">5</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBox;
