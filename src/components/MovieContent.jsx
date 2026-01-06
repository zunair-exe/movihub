import React from 'react'
import HeroServices from './HeroServices'
import Movieslider from './Movieslider'
import GenreSection from './GenreSection'
import MovieDetails from './MovieDetails'
import Footer from './Footer'

const MovieContent = () => {
  return (
    <div>
      <HeroServices/>
      <div className='bg-liner-to-b from-neutral-900 to-neutral-950'>
        <Movieslider />
        <GenreSection />

      </div>
      
        <Footer />
        
    </div>
  )
}

export default MovieContent
