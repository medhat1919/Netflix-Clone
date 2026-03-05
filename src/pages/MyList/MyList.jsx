import React from 'react'
import Navpar from '../../components/Navpar/Navpar'
import Footer from '../../components/Footer/Footer'
import { useList } from '../../context/ListContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const MyList = () => {
    const { myList } = useList();

    return (
        <div className='relative min-h-screen bg-[#141414]'>
            <Navpar />

            <main className="pt-24 space-y-12 pb-24 px-6 lg:px-16">
                <div>
                    <h1 className="text-3xl md:text-5xl font-black text-white">My List</h1>
                    {myList.length === 0 ? (
                        <p className="text-gray-400 mt-4 text-lg">Your list is empty. Add some movies and TV shows!</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-10">
                            {myList.map((item) => (
                                <motion.div
                                    key={item.id}
                                    whileHover={{ scale: 1.05 }}
                                    className="relative aspect-video lg:aspect-[2/3] cursor-pointer group rounded-lg overflow-hidden bg-neutral-900 border border-white/5"
                                >
                                    <Link to={`/Play/${item.media_type || 'movie'}/${item.id}`}>
                                        <img
                                            src={item.backdrop_path
                                                ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                                                : item.poster_path
                                                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                                    : 'https://via.placeholder.com/500x750?text=No+Image'}
                                            alt={item.title || item.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                            <p className="text-white font-bold text-sm line-clamp-2">{item.title || item.name}</p>
                                            <p className="text-gray-400 text-xs mt-1 capitalize">{item.media_type || 'Movie'}</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default MyList
