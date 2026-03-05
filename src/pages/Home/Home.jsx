import React, { useState, useEffect, memo } from 'react'
import Navpar from '../../components/Navpar/Navpar'
import { Play, Info } from 'lucide-react'
import Cards from '../../components/Cards/Cards'
import Footer from '../../components/Footer/Footer'
import axios from '../../api/axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import MovieDetails from '../../components/MovieDetails/MovieDetails'

const Home = memo(() => {
  const [headerMovie, setHeaderMovie] = useState(null)
  const [allMovies, setAllMovies] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('/movie/popular?language=en-US&page=1')
        if (res.data.results && res.data.results.length > 0) {
          const movies = res.data.results.slice(0, 10) // Limit initial check to 10 for performance
          setHeaderMovie(movies[0])
          setAllMovies(movies)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchMovies()
  }, [])

  useEffect(() => {
    if (allMovies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % allMovies.length
        setHeaderMovie(allMovies[nextIndex])
        return nextIndex
      })
    }, 7000) // Increase interval slightly for less frequent re-renders

    return () => clearInterval(interval)
  }, [allMovies])

  return (
    <div className='relative min-h-screen bg-[#000000]'>
      <Navpar />

      <main>
        {headerMovie && (
          <div className="relative h-[95vh] w-full lg:h-screen">
            <div className="absolute inset-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={headerMovie.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  src={`https://image.tmdb.org/t/p/w1280${headerMovie.backdrop_path}`}
                  alt={headerMovie.title}
                  className="h-full w-full object-cover object-top"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-24 lg:bottom-48 left-6 lg:left-16 z-20 flex flex-col items-start gap-6 max-w-4xl">
              <motion.h1
                key={`title-${headerMovie.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-8xl font-black text-white drop-shadow-2xl tracking-tighter"
              >
                {headerMovie.title}
              </motion.h1>

              <motion.p
                key={`desc-${headerMovie.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white text-base lg:text-xl font-medium tracking-tight text-shadow-md max-w-2xl line-clamp-3"
              >
                {headerMovie.overview}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex items-center gap-4 mt-4"
              >
                <Link to={`/Play/movie/${headerMovie.id}`}>
                  <button className="flex items-center justify-center gap-3 rounded-md bg-white px-8 py-3 text-sm lg:text-xl font-black text-black transition-all hover:bg-neutral-200 active:scale-95 shadow-lg shadow-white/5">
                    <Play className="fill-current w-5 h-5 lg:w-7 lg:h-7" /> Play Now
                  </button>
                </Link>
                <button
                  onClick={() => setShowDetails(true)}
                  className="flex items-center justify-center gap-3 rounded-md bg-neutral-600/30 backdrop-blur-md px-8 py-3 text-sm lg:text-xl font-bold text-white transition-all hover:bg-neutral-600/50 active:scale-95 border border-white/5"
                >
                  <Info className="w-5 h-5 lg:w-7 lg:h-7" /> Learn More
                </button>
              </motion.div>
            </div>
          </div>
        )}

        <section className="relative z-30 -mt-16 lg:-mt-24 space-y-12 lg:space-y-20 pb-24">
          <Cards title="Popular Worldwide" />
          <Cards title="Top Rated Classics" category="top_rated" />
          <Cards title="Upcoming Hits" category="upcoming" />
          <Cards title="Award-Winning Series" category="top_rated" />
        </section>
      </main>

      {showDetails && (
        <MovieDetails
          item={headerMovie}
          type="movie"
          onClose={() => setShowDetails(false)}
        />
      )}

      <Footer />
    </div>
  )
})

export default Home
