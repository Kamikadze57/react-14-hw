import { useState, useEffect, useCallback } from "react";
import Searchbar from "./Components/Searchbar/Searchbar";
import ImageGallery from "./Components/ImageGalery/ImageGalery";
import Button from "./Components/Button/Button";
import Loader from "./Components/Loader/Loader";
import Modal from "./Components/Modal/Modal";
import "./App.css";

const API_KEY = "53582608-0c27bff90e7e12c024f44fdb5";
const BASE_URL = "https://pixabay.com/api/";
const PER_PAGE = 12;

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ url: "", tags: "" });
  const [totalHits, setTotalHits] = useState(0);

  const fetchImages = useCallback(async () => {
    if (!searchQuery) return;
    const url = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Помилка завантаження");
      const data = await response.json();
      if (data.hits.length === 0 && page === 1) {
        throw new Error(`Нічого не знайдено за запитом: "${searchQuery}"`);
      }
      setImages((prev) => (page === 1 ? data.hits : [...prev, ...data.hits]));
      setTotalHits(data.totalHits);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleSearchSubmit = useCallback((newQuery) => {
    setSearchQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);
  }, []);

  const toggleModal = useCallback((url = "", tags = "") => {
    setShowModal((prev) => !prev);
    setModalData({ url, tags });
  }, []);

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const showLoadMoreButton = images.length > 0 && images.length < totalHits && !isLoading;

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
      <ImageGallery images={images} onImageClick={toggleModal} />
      {isLoading && <Loader />}
      {showLoadMoreButton && <Button onClick={handleLoadMore} />}
      {showModal && <Modal largeImageURL={modalData.url} tags={modalData.tags} onClose={toggleModal} />}
    </div>
  );
};

export default App;
