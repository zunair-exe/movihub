import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MoviesProvider, useMovies } from './context/MovieContext';
import Navbar from './components/Navbar';
import HeroServices from './components/HeroServices';
import Movieslider from './components/Movieslider';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import MovieDetails from './components/MovieDetails';

// Home Page Component
const HomePage = () => {
  const { trendingMovies, popularMovies, topRatedMovies, loading, error } = useMovies();
  
  if (loading) {
    return (
      <div className="bg-neutral-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-neutral-900 min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }
  
  return (
    <>
      <HeroServices movies={trendingMovies} />
      
      <div className="relative z-20 -mt-24 md:-mt-48 pb-10">
        <Movieslider 
          id="Trending"
          title="Trending Now" 
          subtitle="What's hot this week"
          movies={trendingMovies} 
        />
        
        <Movieslider 
          id="popular"
          title="Popular Movies" 
          subtitle="Fan favorites"
          movies={popularMovies} 
        />
        
        <Movieslider 
          id="top-rated"
          title="Top Rated" 
          subtitle="Critically acclaimed"
          movies={topRatedMovies} 
        />
      </div>
      
      <Footer />
    </>
  );
};

function App() {
  return (
    <MoviesProvider>
      {/* REMOVED <Router> - it's already in main.jsx */}
      <div className="bg-neutral-900 min-h-screen">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
        
        <ScrollToTop />
      </div>
    </MoviesProvider>
  );
}

export default App;