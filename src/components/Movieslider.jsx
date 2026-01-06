import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Movieslider = ({ title, subtitle, movies, id }) => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -600, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 600, behavior: 'smooth' });
    }
  };

  return (
    <section className='py-12 bg-neutral-900 scroll-mt-20' id={id}>
      <div className='container mx-auto px-4'>
        <div className='flex items-baseline justify-between mb-8'>
          <div className='text-2xl md:text-3xl font-bold text-white'>
            <h3>{title}</h3>
            <p className='text-neutral-400 text-sm mt-1'>{subtitle}</p>
          </div>
          
          {/* Slider Controls */}
          <div className='flex space-x-2'>
            <button 
              onClick={scrollLeft}
              className='p-2 rounded-full bg-neutral-800/70 hover:bg-neutral-700 text-white transition-all'
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={scrollRight}
              className='p-2 rounded-full bg-neutral-800/70 hover:bg-neutral-700 text-white transition-all'
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Movie Slider Container - HIDDEN SCROLLBAR */}
        <div className='relative'>
          <div 
            ref={sliderRef}
            className='flex space-x-4 overflow-x-auto pb-4 snap-x'
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {movies?.map((movie) => (
              <div 
                key={movie.id} 
                onClick={() => navigate(`/movie/${movie.id}`)}
                className='w-32 md:w-40 snap-start group relative cursor-pointer shrink-0'
              >
                <div className='rounded-lg overflow-hidden bg-neutral-800 aspect-2/3 relative'>
                  
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title} 
                    className='w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-50'
                  />
                  
                  {/* Hover Overlay */}
                  <div className='absolute inset-0 bg-linear-to-t from-neutral-900 via-neutral-900/40 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300'>
                    <div className='transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-3'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-1'>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className='text-yellow-400 text-sm font-medium'>{movie.vote_average?.toFixed(1)}</span>
                        </div>
                        <span className='text-neutral-300 text-xs'>{movie.release_date?.split('-')[0]}</span>
                      </div>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/movie/${movie.id}`);
                        }}
                        className='w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md flex items-center justify-center gap-1 transition-all text-xs font-bold'
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Movie Info below card */}
                <div className='mt-3'>
                  <h3 className='text-white text-sm font-medium line-clamp-2 leading-tight'>{movie.title}</h3>
                  <div className='flex items-center justify-between mt-1'>
                    <span className='text-neutral-400 text-xs'>{movie.release_date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CSS to hide scrollbar for WebKit browsers */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Movieslider;