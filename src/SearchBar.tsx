import React, { useState } from "react";
import "./styles.css";

type SearchBarType = {
  search: (searchText: string, page: number) => void;
};
const SearchBar = ({ search }: SearchBarType) => {
  const [searchText, setSearchText] = useState<string>("");
  const onSubmitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    search(searchText, 0);
  };
  const onChangehHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  return (
    <form onSubmit={onSubmitHandler} className="flex-gap">
      <label htmlFor="card-search">Search for cards</label>
      <input
        type="search"
        id="card-search"
        name="card-search"
        value={searchText}
        onChange={onChangehHandler}
      />
      <input type="submit" />
    </form>
  );
};

export default SearchBar;
