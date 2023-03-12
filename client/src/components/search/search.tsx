import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <form onSubmit={handleSearch} className={"search_container"}>
      <input
        className={"search_input"}
        placeholder={"Looking for something?"}
        type="text"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <button type="submit" hidden={true}>
        Search
      </button>
    </form>
  );
};
