import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Navpar from '../../components/Navpar/Navpar'
import Footer from '../../components/Footer/Footer'
import axios from '../../api/axios'
import { motion } from 'framer-motion'

const Search = () => {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!query) return

        const fetchResults = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`/search/multi?query=${encodeURIComponent(query)}&language=en-US&page=1`)
                if (res.data.results) {
                    setResults(res.data.results)
                }
            } catch (err) {
                console.error("Search error:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchResults()
    }, [query])

    return (
        <div className='relative min-h-screen bg-[#141414]'>
            <Navpar />

            <main className="pt-24 lg:pt-32 px-6 lg:px-16 pb-24">
                <div className="mb-10">
                    <h1 className="text-gray-400 text-lg">Results for: <span className="text-white font-bold text-2xl ml-2 text-shadow-md">"{query}"</span></h1>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600 border-opacity-50"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {results.length > 0 ? (
                            results.map((item) => (
                                <motion.div
                                    key={item.id}
                                    whileHover={{ scale: 1.05 }}
                                    className="relative aspect-[2/3] cursor-pointer group rounded-lg overflow-hidden bg-neutral-900 border border-white/5"
                                >
                                    <Link to={`/Play/${item.media_type || 'movie'}/${item.id}`}>
                                        <img
                                            src={item.poster_path
                                                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                                : 'https://via.placeholder.com/500x750?text=No+Poster'}
                                            alt={item.title || item.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                            <p className="text-white font-bold text-sm line-clamp-2">{item.title || item.name}</p>
                                            <p className="text-gray-400 text-xs mt-1 capitalize">{item.media_type}</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <p className="text-gray-500 text-xl font-medium">No results found for your search.</p>
                            </div>
                        )}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}

export default Search
