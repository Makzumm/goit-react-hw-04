import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
const API_KEY = "cysMEu8eadLix_VdBQh4AdnQ8QeOqjCCFTicCZeBM5M"

export const fetchGalleryWithQuery = async (query, currentPage) => {
    const response = axios.get(`/search/photos?client_id=${API_KEY}`, {
        params: {
            query: query,
            page: currentPage,
            per_page: 9,
        }
    });
    return response;
};