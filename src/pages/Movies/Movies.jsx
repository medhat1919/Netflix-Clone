import React, { useState, useEffect } from 'react'
import Navpar from '../../components/Navpar/Navpar'
import Cards from '../../components/Cards/Cards'
import Footer from '../../components/Footer/Footer'
import axios from '../../api/axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import MovieDetails from '../../components/MovieDetails/MovieDetails'

const Movies = () => {
    const [headerMovie, setHeaderMovie] = useState(null)
    const [allMovies, setAllMovies] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showDetails, setShowDetails] = useState(false)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await axios.get('/movie/popular?language=en-US&page=1')
                if (res.data.results && res.data.results.length > 0) {
                    const movies = res.data.results.slice(0, 15)

                    const moviesWithTrailers = await Promise.all(
                        movies.map(async (movie) => {
                            try {
                                const videoRes = await axios.get(`/movie/${movie.id}/videos?language=en-US`)
                                const hasTrailer = videoRes.data.results.some(v => v.type === 'Trailer')
                                return hasTrailer ? movie : null
                            } catch (error) {
                                return null
                            }
                        })
                    )

                    const filteredMovies = moviesWithTrailers.filter(m => m !== null).slice(0, 10)

                    if (filteredMovies.length > 0) {
                        setAllMovies(filteredMovies)
                        setHeaderMovie(filteredMovies[0])
                    } else {
                        setAllMovies(res.data.results.slice(0, 10))
                        setHeaderMovie(res.data.results[0])
                    }
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
        }, 5000)

        return () => clearInterval(interval)
    }, [allMovies])

    return (
        <div className='relative min-h-screen bg-[#141414]'>
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
                                    src={`https://image.tmdb.org/t/p/original${headerMovie.backdrop_path}`}
                                    alt={headerMovie.title}
                                    className="h-full w-full object-cover object-top"
                                />
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
                        </div>

                        <div className="absolute bottom-24 lg:bottom-40 left-6 lg:left-16 z-20 flex flex-col items-start gap-6 max-w-2xl">
                            <motion.h1
                                key={`title-${headerMovie.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl"
                            >
                                {headerMovie.title}
                            </motion.h1>

                            <motion.p
                                key={`desc-${headerMovie.id}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-white text-lg md:text-xl font-medium drop-shadow-md line-clamp-3"
                            >
                                {headerMovie.overview}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center gap-4"
                            >
                                <Link to={`/Play/movie/${headerMovie.id}`}>
                                    <button className="flex items-center justify-center gap-2 rounded-md bg-white px-8 py-2 text-lg font-bold text-black transition-all hover:bg-neutral-200 active:scale-95">
                                        <Play className="fill-current w-6 h-6" /> Play
                                    </button>
                                </Link>
                                <button
                                    onClick={() => setShowDetails(true)}
                                    className="flex items-center justify-center gap-2 rounded-md bg-neutral-600/40 backdrop-blur-md px-8 py-2 text-lg font-bold text-white transition-all hover:bg-neutral-600/60 active:scale-95 border border-white/10"
                                >
                                    <Info className="w-6 h-6" /> More Info
                                </button>
                            </motion.div>
                        </div>
                    </div>
                )}

                <section className={`relative z-30 ${headerMovie ? '-mt-16 lg:-mt-24' : 'pt-24'} space-y-12 pb-24`}>
                    <Cards title="Popular Movies" type="movie" category="popular" />
                    <Cards title="Top Rated Films" type="movie" category="top_rated" />
                    <Cards title="Now Playing" type="movie" category="now_playing" />
                    <Cards title="Upcoming Releases" type="movie" category="upcoming" />
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
}

export default Movies
