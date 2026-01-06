const API = "18f73d0a070826d4bfd2d4279e944485";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API}&language=en-US`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error fetching trending movies", error);
        return [];
    }
};

export const fetchPopularMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API}&language=en-US&page=1`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error fetching popular movies", error);
        return [];
    }
};

export const fetchTopRatedMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API}&language=en-US&page=1`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error fetching top rated movies", error);
        return [];
    }
};

export const searchMovies = async (query) => {
    if (!query) return [];
    try {
        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${API}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error searching movies:", error);
        return [];
    }
};

export const fetchMovieDetails = async (id) => {
    try {
        const response = await fetch(
            `${BASE_URL}/movie/${id}?api_key=${API}&language=en-US&append_to_response=videos,credits`
        );
        return await response.json();
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
};

export const fetchWatchProviders = async (id) => {
    try {
        const response = await fetch(
            `${BASE_URL}/movie/${id}/watch/providers?api_key=${API}`
        );
        const data = await response.json();
        return data.results || {};
    } catch (error) {
        console.error("Error fetching watch providers:", error);
        return {};
    }
};

export const getImageURL = (path, size = "original") => {
    if (!path) return "https://via.placeholder.com/1920x1080?text=No+Image";
    return `https://image.tmdb.org/t/p/${size}${path}`;
};

