import { Route, Routes } from "react-router-dom"
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import Sidebar from './components/Sidebar'
import ExplorePage from './pages/ExplorePage'
import LikesPage from './pages/LikesPage'


function App() {
  
//side bar is on ecery single page bcz sidebar is outside of route
  return (
    <div className='flex text-white'> 
      <Sidebar/>
      <div className="max-w5xl my-5 text-white mx-auto transition-all duration-300 flex-1">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/explore" element={<ExplorePage/>}/>
          <Route path="/likes" element={<LikesPage/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
