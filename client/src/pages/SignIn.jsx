import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Label , TextInput, Button , Alert , Spinner} from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice.js'
import Oauth from '../components/Oauth.jsx'


export default function SignIn() {
  const [fromdata , setformdata] = useState({})
  const {loading ,error: erroMessage } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handlechange = (e) =>{
    setformdata({...fromdata , [e.target.id]: e.target.value.trim()})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    if( !fromdata.email || !fromdata.password){
     return dispatch(signInFailure('All fields are reuird'))
    }
   
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/SignIn', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(fromdata),
      })
      
  
      const data = await res.json();
      console.log('Response data:', data);
      if(data.success === false){
        dispatch(signInFailure(data.message))
      }
      
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex mx-auto p-3 max-w-3xl flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
        <Link to= '/' className='font-bold dark:text-white text-4xl'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Bilal</span>
        Blogs
        </Link>
        <p className='mt-5 text-sm'>
          This is a demo peoject you can SignIn with your email
          and password
          or signup with google 
        </p>
        </div>
        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='your email'/>
              <TextInput type='email' placeholder='name@gamil.com' id='email'onChange={handlechange}/>
            </div>
            <div>
              <Label value='your password'/>
              <TextInput type='password' placeholder='********' id='password'onChange={handlechange}/>
            </div>
            
          <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
            {
                loading ? (
                  <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading....</span>
                  </>
                ): 'SignIn'
            }
          </Button>
          <Oauth/>

          </form>
          <div className="flex  mt-5 gap-2 text-sm">
          <span> Don't have an account?</span>
          <Link to='/Signup' className='text-blue-500'>Signup</Link>
          </div>
          {erroMessage  &&(
            <Alert className='mt-5' color='failure'>
              {erroMessage }
            </Alert>
          )}
        </div>
      </div>
      
    </div>
  )
}
