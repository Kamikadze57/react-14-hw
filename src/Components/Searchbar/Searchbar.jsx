import { Component } from "react";
import { ReactComponent as SearchIcon } from "../../search.svg";

class Searchbar extends Component {
  state = {
    searchQuery: "",
  };
  handleChange = (e) => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === "") {
      alert("Введіть слово для пошуку картинок.");
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
  };
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <SearchIcon width="24" height="24" />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
