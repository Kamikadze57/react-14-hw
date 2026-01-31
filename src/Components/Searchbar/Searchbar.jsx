import { ReactComponent as SearchIcon } from "../../search.svg";
import { useState, memo } from "react";

const Searchbar = memo(({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") return alert("Введіть запит");
    onSubmit(query);
  };
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <SearchIcon width="24" height="24" />
        </button>
        <input
          className="SearchForm-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
});

export default Searchbar;
