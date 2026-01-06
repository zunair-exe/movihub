import React, { useState, useEffect } from 'react';
import { getImageURL } from '../services/api';

const HeroServices = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!movies || movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.min(movies.length, 5));
    }, 5000);
    return () => clearInterval(interval);
  }, [movies]);

  if (!movies || movies.length === 0) {
    return <div className='w-full h-screen bg-neutral-900'></div>; 
  }

  const currentMovie = movies[currentIndex];

  return (
    <div className='relative w-full h-screen overflow-hidden bg-neutral-900'>
     
      <div 
        key={currentMovie.id}
        className='absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out' 
        style={{ 
          backgroundImage: `url('${getImageURL(currentMovie.backdrop_path, 'original')}')`,
          opacity: 1 
        }}
      >
        
        <div className='absolute inset-0 bg-linear-to-r from-neutral-900 via-neutral-900/60 to-transparent z-1'></div>
        <div className='absolute inset-0 bg-linear-to-t from-neutral-900 via-transparent to-transparent z-1'></div>
      </div>

      {/* Content */}
      <div className='absolute inset-0 flex items-center z-10 container mx-auto px-4 md:px-8'>
        <div className='max-w-3xl animate-fadeIn'>
          <div className='flex items-center space-x-3 mb-4'>
            <span className='bg-red-700 text-white text-xs font-bold px-2 py-1 rounded-sm'>FEATURED</span>
            <span className='text-yellow-400 font-bold'>★ {currentMovie.vote_average?.toFixed(1)}</span>
          </div>
          <h1 className='text-4xl md:text-7xl font-extrabold text-white mb-4'>{currentMovie.title}</h1>
          <p className='text-neutral-300 text-lg mb-8 line-clamp-3 max-w-2xl'>{currentMovie.overview}</p>
          
          <div className='flex gap-4'>
            <button className='bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-all cursor-pointer'>Watch Now</button>
            <button className='bg-neutral-800/80 hover:bg-neutral-700 text-white px-8 py-3 rounded-lg border border-neutral-600 font-bold transition-all cursor-pointer'>+ Watchlist</button>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className='absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-20'>
        {movies.slice(0, 5).map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === index ? 'w-10 bg-red-600' : 'w-2 bg-neutral-600'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroServices;