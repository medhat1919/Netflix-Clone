   import './App.css'
   import Home from './Pages/Home/Home'
   import { Routes, Route } from 'react-router-dom'
import Play from './pages/Play/Play'
 
function App() {
     


  return (
    <>
      <div className="App">
         <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/Play/:id' element={<Play/>}/>
         
          </Routes>
            

                
            
      </div>
    </>
  )
}

export default App
