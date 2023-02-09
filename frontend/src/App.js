import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Feed from './pages/Feed'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Header from './components/Header'
import NewPost from './pages/NewPost'

function App() {
  return (
    <>
      <Router>
        <div className='bg-[#1c1c1f]'>
          <Header />
          <Routes>
            <Route path='/' element={<Feed />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/u' element={<Profile />} />
            <Route path='/newpost' element={<NewPost />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
