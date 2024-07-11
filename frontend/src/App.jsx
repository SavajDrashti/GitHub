import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from 'react-hot-toast'

import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import Sidebar from './components/Sidebar'
import ExplorePage from './pages/ExplorePage'
import LikesPage from './pages/LikesPage'
import { useAuthContext } from "./context/AuthContext"



function App() {

  const {authUser, loading} = useAuthContext();
  console.log("Authenticated user:" ,authUser);

  if(loading){
    return null;
  }
  
//side bar is on ecery single page bcz sidebar is outside of route
  return (
    <div className='flex text-white'> 
      <Sidebar/>
      <div className="max-w5xl my-5 text-white mx-auto transition-all duration-300 flex-1">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to={"/"}/> } />
          <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to={"/"} /> }/>
          <Route path="/explore" element={authUser ? <ExplorePage/> : <Navigate to={"/login"}/> } />
          <Route path="/likes" element={authUser ? <LikesPage/> : <Navigate to={"/login"}/> }/>
        </Routes>
        <Toaster/>
      </div>
    </div>
  )
}

export default App
