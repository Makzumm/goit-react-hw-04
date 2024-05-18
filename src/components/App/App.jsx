import { useEffect, useState, useMemo } from 'react'
import { fetchGalleryWithQuery } from "../../gallery-api.js";
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import Loader from '../Loader/Loader.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadrMoreBtn.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import { toast } from 'react-hot-toast';

function App() {
  const [galleryData, setGalleryData] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setCurrPage] = useState(1);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return
    }
    async function fetchPhotos() {
      setLoadingState(true)
      setErrorState(false)
      try {
        setTotalPages(0)
        const response = await fetchGalleryWithQuery(searchQuery, page);
        setTotalPages(response.data.total_pages)
        setGalleryData(prevImages => [...prevImages, ...response.data.results]);
        setSubmitted(true)
      } catch (error) {
        console.log(error)
        setErrorState(true)
      } finally {
        setLoadingState(false)
      }
    }
    fetchPhotos()

  }, [page, searchQuery])

  const displayedImages = useMemo(() => {
    return galleryData.slice(0, page * 9);
  }, [galleryData, page]);

  useEffect(() => {
    if (submitted && displayedImages.length === 0 && !loadingState && !errorState) {
      toast.error('No results found. Try to find something else!');
    }
  }, [submitted, displayedImages.length, loadingState, errorState]);

  const onSubmit = async (values, actions) => {
    const searchInput = values.searchInput;
    if (searchInput === '') {
      toast.error('Input field cannot be empty');
      return;
    }
    setSearchQuery(searchInput);
    setCurrPage(1);
    setGalleryData([]);
    actions.resetForm();
  }

  const onLoadMoreBtn = async () => {
    setCurrPage(page + 1)
  }

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      <ErrorMessage />
      {loadingState && <Loader />}
      {displayedImages.length > 0 && <ImageGallery galleryData={displayedImages} />}
      {totalPages > 1 && !loadingState && page < totalPages && searchQuery !== '' && (<LoadMoreBtn onClick={onLoadMoreBtn} />)}
      {errorState && <p>Mamamiya, papaya-papaya, parmezano, something went wrong! Amigo...</p>}
    </>
  )
}

export default App
