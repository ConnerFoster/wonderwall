import { useState, useEffect } from 'react'
import { BsFillMusicPlayerFill } from 'react-icons/bs'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const { username, password } = formData

  const onChange = () => {}

  const onSubmit = () => {}

  return (
    <div className='h-screen text-[#ddd] text-center flex flex-col gap-5 justify-center'>
      <section className='flex flex-col items-center gap-3'>
        <BsFillMusicPlayerFill className='w-12 h-12' />
        <h1 className='text-2xl'>Hello, there!</h1>
        <h3>Register for an account below</h3>
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

export default Register
