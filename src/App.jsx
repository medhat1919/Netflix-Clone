import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import SplashScreen from './components/SplashScreen/SplashScreen'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home/Home'))
const Play = lazy(() => import('./pages/Play/Play'))
const TVShows = lazy(() => import('./pages/TVShows/TVShows'))
const Movies = lazy(() => import('./pages/Movies/Movies'))
const NewPopular = lazy(() => import('./pages/NewPopular/NewPopular'))
const MyList = lazy(() => import('./pages/MyList/MyList'))
const Search = lazy(() => import('./pages/Search/Search'))
const Login = lazy(() => import('./pages/Login/Login'))
const Signup = lazy(() => import('./pages/Signup/Signup'))

// Loading fallback component
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-[#141414]">
    <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const { user, login } = useAuth();

  useEffect(() => {
    // Auto-login as guest right after splash so everything works without manual login
    if (!showSplash && !user) {
      login('guest@netflix.com', 'password123');
    }
  }, [showSplash, user, login]);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white selection:bg-red-600 selection:text-white">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/' element={<Home />} />
          <Route path='/tv-shows' element={<TVShows />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/new-popular' element={<NewPopular />} />
          <Route path='/my-list' element={<MyList />} />
          <Route path='/search' element={<Search />} />
          <Route path='/Play/:type/:id' element={<Play />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
