import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
    useEffect(() => {
        const audio = new Audio('https://assets.nflxext.com/ffe/siteui/common/akira/kanji/audio/intro.mp3');

        const playSound = async () => {
            try {
                await audio.play();
            } catch (err) {
                console.log("Audio play blocked");
            }
        };

        playSound();

        const timer = setTimeout(() => {
            onComplete();
        }, 3000);

        return () => {
            clearTimeout(timer);
            audio.pause();
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black overflow-hidden pointer-events-none">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <svg
                    viewBox="0 0 100 100"
                    className="w-32 h-32 md:w-56 md:h-56 fill-red-600"
                >
                    <path d="M20 0 v100 h20 v-60 l40 60 h20 v-100 h-20 v60 l-40 -60 z" />
                </svg>
            </motion.div>
        </div>
    );
};

export default SplashScreen;
