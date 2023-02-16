import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Feed from './pages/Feed'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NewPost from './pages/NewPost'
import EditProfile from './pages/EditProfile'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/newpost' element={<NewPost />} />
          <Route path='/editprofile' element={<EditProfile />} />
        </Routes>
      </Router>

      <ToastContainer />
    </>
  )
}

export default App
