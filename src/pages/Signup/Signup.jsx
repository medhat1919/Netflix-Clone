import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please provide an email and password.');
            return;
        }
        const success = signup(email, password);
        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-black">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 text-white/10">
                <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bca1-0746f343f1a6/8470a345-3141-432d-82d4-722c1598471c/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
                    className="w-full h-full object-cover opacity-50"
                    alt="background"
                />
                <div className="absolute inset-0 bg-black/60 shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]" />
            </div>

            {/* Logo */}
            <div className="absolute top-8 left-8 z-20">
                <h1 className="text-4xl font-black text-red-600 tracking-tighter">NETFLIX</h1>
            </div>

            {/* Signup Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-md p-10 lg:p-16 bg-black/75 rounded-lg border border-white/10 backdrop-blur-sm"
            >
                <h2 className="text-3xl font-bold text-white mb-8">Sign Up</h2>

                {error && (
                    <div className="bg-[#e87c03] text-white p-3 rounded text-sm mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full p-4 bg-[#333] text-white rounded outline-none focus:bg-[#454545] transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <input
                            type="password"
                            placeholder="Create Password"
                            className="w-full p-4 bg-[#333] text-white rounded outline-none focus:bg-[#454545] transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full p-4 bg-red-600 text-white font-bold rounded hover:bg-red-700 active:scale-[0.98] transition mt-4"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-16 text-[#737373]">
                    Already have an account? <Link to="/login" className="text-white hover:underline">Sign in now.</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
