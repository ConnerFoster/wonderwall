import { useState, useEffect } from 'react'
import { BsFillMusicPlayerFill } from 'react-icons/bs'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const { username, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
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
            type='text'
            id='password'
            name='password'
            value={password}
            placeholder='Password'
            className='inputs'
            onChange={onChange}
          />
          <button type='submit'>Submit</button>
        </form>
      </section>
    </div>
  )
}

export default Login
