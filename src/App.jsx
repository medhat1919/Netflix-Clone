import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

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
    // If we're coming from the splash and no user exists, auto-login to bypass to Home
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

          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/tv-shows' element={<ProtectedRoute><TVShows /></ProtectedRoute>} />
          <Route path='/movies' element={<ProtectedRoute><Movies /></ProtectedRoute>} />
          <Route path='/new-popular' element={<ProtectedRoute><NewPopular /></ProtectedRoute>} />
          <Route path='/my-list' element={<ProtectedRoute><MyList /></ProtectedRoute>} />
          <Route path='/search' element={<ProtectedRoute><Search /></ProtectedRoute>} />
          <Route path='/Play/:type/:id' element={<ProtectedRoute><Play /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
