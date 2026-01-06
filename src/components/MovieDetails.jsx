import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, fetchWatchProviders, getImageURL } from '../services/api';


const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [watchProviders, setWatchProviders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieData, providersData] = await Promise.all([
          fetchMovieDetails(id),
          fetchWatchProviders(id)
        ]);
        
        setMovie(movieData);
        setWatchProviders(providersData);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-red-500 text-xl">Movie not found</div>
      </div>
    );
  }

  // Get trailer from videos
  const trailer = movie.videos?.results?.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  );
  const usProviders = watchProviders?.US;

  return (
    <div className="min-h-screen pt-20 bg-neutral-900">
      {/* Backdrop */}
      <div 
        className="relative w-full h-96 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('${getImageURL(movie.backdrop_path, 'original')}')` 
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-neutral-900/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="shrink-0">
            <img 
              src={getImageURL(movie.poster_path, 'w500')} 
              alt={movie.title}
              className="w-64 rounded-lg shadow-2xl"
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <button 
              onClick={() => navigate(-1)}
              className="text-neutral-400 hover:text-white mb-4 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </button>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {movie.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-yellow-400 font-bold">{movie.vote_average?.toFixed(1)}</span>
              </div>
              <span className="text-neutral-400">{movie.release_date}</span>
              <span className="text-neutral-400">{movie.runtime} min</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres?.map(genre => (
                <span 
                  key={genre.id}
                  className="px-3 py-1 bg-neutral-800 text-white rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-neutral-300 text-lg mb-8 leading-relaxed">
              {movie.overview}
            </p>

            {/* Watch Options */}
            <div className="mb-8">
              <h3 className="text-white text-xl font-bold mb-4">Watch Options</h3>
              
              <div className="flex flex-wrap gap-4">
                {/* Trailer Button */}
                {trailer && (
                  <button 
                    onClick={() => setShowTrailer(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Watch Trailer
                  </button>
                )}
                
                <button className="bg-neutral-800 hover:bg-neutral-700 text-white px-8 py-3 rounded-lg font-bold transition-all">
                  + Watchlist
                </button>
              </div>

              {/* Streaming Providers */}
              {usProviders && (
                <div className="mt-6">
                  {usProviders.flatrate && usProviders.flatrate.length > 0 && (
                    <div className="mb-4">
                      <p className="text-neutral-400 text-sm mb-2">Available on:</p>
                      <div className="flex flex-wrap gap-3">
                        {usProviders.flatrate.map(provider => (
                          <div key={provider.provider_id} className="group relative">
                            <img 
                              src={getImageURL(provider.logo_path, 'w92')}
                              alt={provider.provider_name}
                              className="w-12 h-12 rounded-lg hover:scale-110 transition-transform cursor-pointer"
                              title={provider.provider_name}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {usProviders.rent && usProviders.rent.length > 0 && (
                    <div>
                      <p className="text-neutral-400 text-sm mb-2">Rent on:</p>
                      <div className="flex flex-wrap gap-3">
                        {usProviders.rent.map(provider => (
                          <div key={provider.provider_id} className="group relative">
                            <img 
                              src={getImageURL(provider.logo_path, 'w92')}
                              alt={provider.provider_name}
                              className="w-12 h-12 rounded-lg hover:scale-110 transition-transform cursor-pointer"
                              title={provider.provider_name}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div className="relative w-full max-w-5xl aspect-video">
            <button 
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-white hover:text-red-500 text-2xl font-bold"
            >
              ✕
            </button>
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;