import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchTrendingMovies, fetchPopularMovies, fetchTopRatedMovies } from '../services/api';

const MovieContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        // Fetch all categories simultaneously
        const [trending, popular, topRated] = await Promise.all([
          fetchTrendingMovies(),
          fetchPopularMovies(),
          fetchTopRatedMovies()
        ]);

        setTrendingMovies(trending || []);
        setPopularMovies(popular || []);
        setTopRatedMovies(topRated || []);
      } catch (err) {
        console.error("Context Error:", err);
        setError("Failed to load movies. Please check your API key.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <MovieContext.Provider value={{ 
      trendingMovies, 
      popularMovies, 
      topRatedMovies, 
      loading, 
      error 
    }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovies must be used within a MoviesProvider");
  }
  return context;
};