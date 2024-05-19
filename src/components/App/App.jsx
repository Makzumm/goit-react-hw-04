import { useEffect, useState, useMemo } from 'react';
import { fetchGalleryWithQuery } from "../../gallery-api.js";
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import Loader from '../Loader/Loader.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import ImageModal from '../ImageModal/ImageModal.jsx';
import { toast } from 'react-hot-toast';

function App() {
  const [galleryData, setGalleryData] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setCurrPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }
    async function fetchPhotos() {
      setLoadingState(true);
      setErrorState(false);
      try {
        setTotalPages(0);
        const response = await fetchGalleryWithQuery(searchQuery, page);
        setTotalPages(response.data.total_pages);
        setGalleryData(prevImages => [...prevImages, ...response.data.results]);
        setSubmitted(true);
      } catch (error) {
        console.log(error);
        setErrorState(true);
        setErrorMessage('Failed to fetch images. Please try again later.');
      } finally {
        setLoadingState(false);
      }
    }
    fetchPhotos();
  }, [page, searchQuery]);

  const displayedImages = useMemo(() => {
    return galleryData.slice(0, page * 9);
  }, [galleryData, page]);

  useEffect(() => {
    if (submitted && displayedImages.length === 0 && !loadingState && !errorState) {
      toast.error('No results found. Try to find something else!');
    }
  }, [submitted, displayedImages.length, loadingState, errorState]);

  const onSubmit = async (values, actions) => {
    const searchInput = values.searchInput.trim();
    if (searchInput === '') {
      toast.error('Input field cannot be empty');
      return;
    }
    setSearchQuery(searchInput);
    setCurrPage(1);
    setGalleryData([]);
    actions.resetForm();
  };

  const onLoadMoreBtn = async () => {
    setCurrPage(page + 1);
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      <ErrorMessage message={errorMessage} />
      {loadingState && <Loader />}
      {displayedImages.length > 0 && (
        <ImageGallery galleryData={displayedImages} openModal={openModal} />
      )}
      {totalPages > 1 && !loadingState && page < totalPages && searchQuery !== '' && (
        <LoadMoreBtn onClick={onLoadMoreBtn} />
      )}
      {errorState && (
        <p>Mamamiya, papaya-papaya, parmezano, something went wrong! Amigo...</p>
      )}
      <ImageModal isOpen={isModalOpen} closeModal={closeModal} imageUrl={selectedImage} imageDescription="Image Description" />
    </>
  );
}

export default App;