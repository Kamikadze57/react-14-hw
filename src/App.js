import { Component } from "react";
import Searchbar from "./Components/Searchbar/Searchbar";
import ImageGallery from "./Components/ImageGalery/ImageGalery";
import Button from "./Components/Button/Button";
import Loader from "./Components/Loader/Loader";
import Modal from "./Components/Modal/Modal";
import "./App.css";

const API_KEY = "53582608-0c27bff90e7e12c024f44fdb5";
const BASE_URL = "https://pixabay.com/api/";
const PER_PAGE = 12;

class App extends Component {
  state = {
    searchQuery: "",
    images: [],
    page: 1,
    isLoading: false,
    error: null,
    showModal: false,
    largeImageURL: "",
    imageTags: "",
    totalHits: 0,
  };

  fetchImages = async () => {
    const { searchQuery, page } = this.state;
    if (!searchQuery) return;
    const url = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;
    this.setState({ isLoading: true, error: null });
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Не вдалося завантажити зображення по запиту: ${searchQuery} (Статус: ${response.status})`);
      }
      const data = await response.json();
      if (data.hits.length === 0 && page === 1) {
        throw new Error(`Не знайдено зображень по запиту: "${searchQuery}"`);
      }
      this.setState((prevState) => ({
        images: page === 1 ? data.hits : [...prevState.images, ...data.hits],
        totalHits: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery || prevState.page !== this.state.page) {
      this.fetchImages();
    }
  }
  handleSearchSubmit = (newQuery) => {
    if (newQuery.trim() !== "" && newQuery !== this.state.searchQuery) {
      this.setState({
        searchQuery: newQuery,
        page: 1,
        images: [],
        error: null,
        totalHits: 0,
      });
    }
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };
  toggleModal = (largeImageURL = "", tags = "") => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
      largeImageURL,
      imageTags: tags,
    }));
  };
  render() {
    const { images, isLoading, showModal, largeImageURL, imageTags, totalHits, error } = this.state;
    const showLoadMoreButton = images.length > 0 && images.length < totalHits && !isLoading;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {error && <p style={{ textAlign: "center", color: "red" }}>Помилка: {error}</p>}
        {images.length > 0 && <ImageGallery images={images} onImageClick={this.toggleModal} />}
        {isLoading && <Loader />}
        {showLoadMoreButton && <Button onClick={this.handleLoadMore} />}
        {showModal && <Modal largeImageURL={largeImageURL} tags={imageTags} onClose={this.toggleModal} />}
      </div>
    );
  }
}

export default App;
