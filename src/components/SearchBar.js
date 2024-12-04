import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    onSearch(search); // Call the onSearch prop with the search term
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search tasks"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch} className="hmm">Search</button>
      <p className="Note">Note: Clear the SearchBar And Search To see Every Exsiting Task</p>
    </div>
  );
};

export default SearchBar;
