import React, { useEffect, useRef, useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, ChevronLeft, Info } from 'lucide-react'
import axios from '../../api/axios'
import MovieDetails from '../MovieDetails/MovieDetails'

const Cards = memo(({ title, category, type = 'movie' }) => {
  const [Apidata, SetApidata] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const endpoint = category ? `/${type}/${category}` : `/${type}/popular`;
    axios.get(`${endpoint}?language=en-US&page=1`)
      .then(res => {
        if (res.data.results && res.data.results.length > 0) {
          SetApidata(res.data.results);
        }
      })
      .catch(err => console.error(err));
  }, [category, type])

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.7 : scrollLeft + clientWidth * 0.7
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <div className="group/row relative px-6 lg:px-16 overflow-visible mt-10">
      <h2 className="text-lg lg:text-2xl font-black text-white mb-6 lg:mb-8 tracking-tight drop-shadow-md">
        {title || 'Trending Content'}
      </h2>

      <div className="relative group/nav">
        {/* Navigation Buttons */}
        <button
          className="absolute -left-6 lg:-left-12 top-0 bottom-0 z-40 px-2 lg:px-4 opacity-0 group-hover/nav:opacity-100 transition-all text-white hover:scale-125 scale-100 bg-black/20"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-10 w-10 lg:h-14 lg:w-14" />
        </button>

        <div
          ref={scrollRef}
          className="flex items-center space-x-3 lg:space-x-5 overflow-x-scroll no-scrollbar py-4 overflow-visible"
        >
          {Apidata.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.1, zIndex: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative min-w-[200px] aspect-video lg:min-w-[280px] cursor-pointer group rounded-lg overflow-visible"
              onClick={() => setSelectedMovie(card)}
            >
              <div className="w-full h-full rounded-lg overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-white/5 bg-neutral-900">
                <img
                  src={`https://image.tmdb.org/t/p/w500${card.backdrop_path || card.poster_path}`}
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500"
                  alt={card.original_title || card.name}
                  loading="lazy"
                />
                {/* Subtle info label - reveals on hover */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
                  <p className="text-white text-xs font-bold truncate max-w-[80%]">{card.title || card.name}</p>
                  <Info size={16} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          className="absolute -right-6 lg:-right-12 top-0 bottom-0 z-40 px-2 lg:px-4 opacity-0 group-hover/nav:opacity-100 transition-all text-white hover:scale-125 scale-100 bg-black/20"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-10 w-10 lg:h-14 lg:w-14" />
        </button>
      </div>

      {selectedMovie && (
        <MovieDetails
          item={selectedMovie}
          type={type}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  )
})

export default Cards
