import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { BsFillMusicPlayerFill, BsArrowRight } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import ClipLoader from 'react-spinners/ClipLoader'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const { username, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const getButton = <BsArrowRight className='text-[#5865f2]' />

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }

    if (isLoading) {
      getButton = <ClipLoader color='#ddd' />
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      username,
      password,
    }

    dispatch(login(userData))
  }

  return (
    <div className='h-screen text-[#ddd] text-center flex flex-col gap-5 justify-center'>
      <section className='flex flex-col items-center gap-3'>
        <BsFillMusicPlayerFill className='w-12 h-12' />
        <h1 className='text-2xl'>Welcome back! &#128075;</h1>
        <h3>Please enter your login credentials below</h3>
      </section>

      <section>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            id='username'
            name='username'
            value={username}
            placeholder='Username'
            className='inputs'
            onChange={onChange}
          />
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            placeholder='Password'
            className='inputs'
            onChange={onChange}
          />
          <button
            type='submit'
            className='outline outline-1 outline-gray-700 rounded-full p-3'>
            {getButton}
          </button>
        </form>
        <Link to='/register'>
          <h3 className='my-5 text-[#5865f2]/70'>Don't have an account?</h3>
        </Link>
      </section>
    </div>
  )
}

export default Login
