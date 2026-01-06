import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { searchMovies, getImageURL } from '../services/api';

function Navbar() {
  // Navigation & Scroll States
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const searchContainerRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Navbar Hide/Show Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrolled(currentScrollPos > 10);
      if (!isMobileMenuOpen) {
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      }
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, isMobileMenuOpen]);

  // Search Logic (Debounced)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setShowSearchResult(false);
      return;
    }

    const fetchResults = async () => {
      setIsSearching(true);
      const results = await searchMovies(searchQuery);
      setMovies(results);
      setShowSearchResult(true);
      setIsSearching(false);
    };

    const timer = setTimeout(fetchResults, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle navigation with smooth scroll
  const handleNavClick = (sectionId) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      navigate('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'} ${visible ? 'translate-y-0' : '-translate-y-full'}`}> 
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link to="/" className='text-red-700 font-bold text-3xl'>
              movi<span className='text-white'>hub</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className='hidden md:flex space-x-8'>
            <Link to="/" className='text-white hover:text-red-500 font-medium'>
              Home
            </Link>
            <button 
              onClick={() => handleNavClick('Trending')}
              className='text-white hover:text-red-500 font-medium'
            >
              Trending
            </button>
            <button 
              onClick={() => handleNavClick('popular')}
              className='text-white hover:text-red-500 font-medium'
            >
              Popular
            </button>
            <button 
              onClick={() => handleNavClick('top-rated')}
              className='text-white hover:text-red-500 font-medium'
            >
              Top rated
            </button>
          </nav>

          <div className='flex items-center space-x-4' ref={searchContainerRef}>
            <div className='hidden md:block relative'>
              <input 
                type="text" 
                placeholder='Search Movies...' 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchResult(true)}
                className='bg-neutral-800/80 rounded-full text-sm text-white px-4 py-2 w-48 focus:w-64 transition-all duration-300 outline-none focus:ring-2 focus:ring-red-600'
              />
              
              {showSearchResult && searchQuery.trim().length > 0 && (
                <div className="absolute top-full mt-2 w-72 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl overflow-hidden z-50">
                  
                  {movies.length > 0 && (
                    <ul className='max-h-80 overflow-y-auto divide-y divide-neutral-800'>
                      {movies.map(movie => (
                        <li 
                          key={movie.id} 
                          onClick={() => {
                            navigate(`/movie/${movie.id}`);
                            setSearchQuery('');
                            setShowSearchResult(false);
                          }}
                          className='flex items-center p-3 hover:bg-neutral-800 cursor-pointer'
                        >
                          <img 
                            src={getImageURL(movie.poster_path, 'w92')} 
                            alt="" 
                            className="w-10 h-14 object-cover rounded mr-3" 
                          />
                          <span className='text-white text-sm font-medium line-clamp-1'>
                            {movie.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {movies.length === 0 && !isSearching && (
                    <div className='p-4 text-center text-neutral-400 text-sm'>
                      No movies found matching "{searchQuery}"
                    </div>
                  )}

                  {isSearching && (
                    <div className='p-4 text-center text-neutral-400 text-sm italic'>
                      Searching...
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Button */}
            <button 
              className='md:hidden text-white' 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l3.293-3.293-3.293-3.293a1 1 0 011.414-1.414l3.293 3.293 3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;