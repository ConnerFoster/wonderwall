import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Feed from './pages/Feed'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NewPost from './pages/NewPost'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Router>
        <div className='bg-[#1c1c1f]'>
          <Routes>
            <Route path='/' element={<Feed />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/u' element={<Profile />} />
            <Route path='/newpost' element={<NewPost />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
