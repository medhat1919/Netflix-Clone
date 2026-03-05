import { useState, useEffect, memo } from 'react'
import { Search, Bell, ChevronDown, Menu, X } from 'lucide-react'
import logo from '../../assets/logo.png'
import profile_img from '../../assets/Profile_img.png'
import { cn } from '../../lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navpar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
    } else {
      navigate('/')
    }
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'TV Shows', path: '/tv-shows' },
    { name: 'Movies', path: '/movies' },
    { name: 'New & Popular', path: '/new-popular' },
    { name: 'My List', path: '/my-list' },
  ]

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out",
      isScrolled || isMenuOpen
        ? "bg-black/95 lg:bg-black/40 backdrop-blur-xl border-b border-white/5 py-3"
        : "bg-transparent py-6"
    )}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-6 lg:gap-12">
          {/* Mobile Menu Icon */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link to="/">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={logo}
              alt="Netflix"
              className="w-20 lg:w-32 cursor-pointer transition-transform hover:scale-105"
            />
          </Link>
          <ul className="hidden lg:flex gap-8 text-[14px] font-bold tracking-tight text-gray-200/80">
            {navItems.map((item) => (
              <li key={item.name} className="cursor-pointer transition-all hover:text-white">
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4 lg:gap-10 text-white">
          <div className={cn(
            "flex items-center gap-2 px-2 py-1 rounded-sm border transition-all duration-300",
            isSearchActive ? "bg-black border-white w-40 md:w-64" : "bg-transparent border-transparent w-8"
          )}>
            <Search
              className="w-5 h-5 cursor-pointer text-gray-300 hover:text-white transition-colors flex-shrink-0"
              onClick={() => setIsSearchActive(!isSearchActive)}
            />
            {isSearchActive && (
              <input
                autoFocus
                type="text"
                placeholder="Titles, people, genres"
                className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-gray-500"
                value={searchQuery}
                onChange={handleSearch}
                onBlur={() => !searchQuery && setIsSearchActive(false)}
              />
            )}
          </div>

          <Bell className="w-5 h-5 cursor-pointer text-gray-300 hover:text-white transition-colors hidden md:block" />

          <div className="group relative flex items-center gap-2 cursor-pointer">
            <img
              src={profile_img}
              alt="Profile"
              className="w-8 h-8 lg:w-9 lg:h-9 rounded-md object-cover border border-white/10"
            />
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-transform duration-300 group-hover:rotate-180" />

            <div className="absolute right-0 top-full mt-4 hidden group-hover:block">
              <div className="bg-black/95 backdrop-blur-2xl border border-white/10 p-4 rounded-xl shadow-2xl w-48 overflow-hidden">
                <p className="text-sm font-semibold p-2 mb-1 text-gray-400 border-b border-white/10">Hello, {user?.name}</p>
                <p className="text-sm font-semibold hover:bg-white/5 p-2 rounded-lg transition-colors mt-1">Settings</p>
                <div className="h-px bg-white/10 my-2" />
                <p
                  onClick={handleLogout}
                  className="text-sm font-semibold text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors"
                >
                  Sign Out
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 py-6 px-6"
          >
            <ul className="flex flex-col gap-6 text-lg font-bold">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-300 hover:text-white block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
})

export default Navpar
