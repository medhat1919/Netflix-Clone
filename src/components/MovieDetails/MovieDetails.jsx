import React, { useEffect, useState } from 'react';
import { X, Play, Plus, Check, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../../api/axios';
import { useList } from '../../context/ListContext';
import { Link } from 'react-router-dom';

const MovieDetails = ({ item, type, onClose }) => {
    const [details, setDetails] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [muted, setMuted] = useState(true);
    const { addToExitingList, removeFromList, isInList } = useList();

    useEffect(() => {
        if (!item) return;

        const fetchDetails = async () => {
            try {
                const [detailsRes, videoRes] = await Promise.all([
                    axios.get(`/${type}/${item.id}?language=en-US`),
                    axios.get(`/${type}/${item.id}/videos?language=en-US`)
                ]);

                setDetails(detailsRes.data);
                const officialTrailer = videoRes.data.results.find(v => v.type === 'Trailer') || videoRes.data.results[0];
                setTrailer(officialTrailer);
            } catch (err) {
                console.error("Error fetching details:", err);
            }
        };

        fetchDetails();
    }, [item, type]);

    if (!item) return null;

    const isAdded = isInList(item.id);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-10"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#181818] rounded-xl shadow-2xl no-scrollbar"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                    >
                        <X size={24} />
                    </button>

                    {/* Preview / Header Image */}
                    <div className="relative aspect-video w-full">
                        {trailer ? (
                            <div className="w-full h-full">
                                <iframe
                                    src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&rel=0&modestbranding=1&loop=1&playlist=${trailer.key}`}
                                    className="w-full h-full pointer-events-none"
                                    title="trailer"
                                    frameBorder="0"
                                    allow="autoplay"
                                ></iframe>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
                                <button
                                    onClick={() => setMuted(!muted)}
                                    className="absolute bottom-10 right-10 p-2 rounded-full border border-white/40 bg-black/20 hover:bg-white/10 text-white transition"
                                >
                                    {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                </button>
                            </div>
                        ) : (
                            <>
                                <img
                                    src={`https://image.tmdb.org/t/p/original${item.backdrop_path || item.poster_path}`}
                                    alt={item.title || item.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
                            </>
                        )}

                        <div className="absolute bottom-10 left-10 space-y-4">
                            <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">
                                {item.title || item.name}
                            </h2>
                            <div className="flex items-center gap-4">
                                <Link to={`/Play/${type}/${item.id}`}>
                                    <button className="flex items-center gap-2 px-8 py-2 bg-white text-black rounded font-bold hover:bg-neutral-200 transition">
                                        <Play fill="black" size={20} /> Play
                                    </button>
                                </Link>
                                <button
                                    onClick={() => isAdded ? removeFromList(item.id) : addToExitingList(item)}
                                    className="p-2 rounded-full border-2 border-white/50 bg-black/40 hover:border-white text-white transition"
                                >
                                    {isAdded ? <Check size={24} /> : <Plus size={24} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Detail */}
                    <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                        <div className="md:col-span-2 space-y-6">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-green-500 font-bold">{Math.round(item.vote_average * 10)}% Match</span>
                                <span className="border border-white/40 px-1.5 py-0.5 text-[10px] uppercase">{details?.status || 'Active'}</span>
                                <span className="text-gray-400">{details?.release_date?.split('-')[0] || details?.first_air_date?.split('-')[0]}</span>
                            </div>
                            <p className="text-lg leading-relaxed text-gray-200">
                                {item.overview || details?.overview}
                            </p>
                        </div>

                        <div className="space-y-4 text-sm text-gray-400">
                            <div>
                                <span className="text-gray-500">Genres: </span>
                                {details?.genres?.map(g => g.name).join(', ')}
                            </div>
                            <div>
                                <span className="text-gray-500">Popularity: </span>
                                {Math.round(item.popularity)}
                            </div>
                            <div>
                                <span className="text-gray-500">Language: </span>
                                {details?.spoken_languages?.[0]?.english_name || 'English'}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MovieDetails;
