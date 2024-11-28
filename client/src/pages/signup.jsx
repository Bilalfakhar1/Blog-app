import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Label , TextInput, Button , Alert , Spinner} from 'flowbite-react'
import Oauth from '../components/Oauth'

export default function Signup() {
  const [fromdata , setformdata] = useState({})
  const [errorMessage , setErrorMessage] = useState([])
  const [loading,setloading] = useState(false)
  const navigate = useNavigate()
  const handlechange = (e) =>{
    setformdata({...fromdata , [e.target.id]: e.target.value.trim()})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(!fromdata.username || !fromdata.email || !fromdata.password){
      return setErrorMessage('All fields are reuird')
    }
    setloading(true)
    setErrorMessage(null)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(fromdata),
      })
      
  
      const data = await res.json();
      console.log('Response data:', data);
      if(data.success === false){
        return setErrorMessage(data.message)
      }
      setloading(false)
      if(res.ok){
        navigate('/SignIN')
      }
    } catch (error) {
      setErrorMessage(data.message)
      setloading(false)
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
          This is a demo peoject you can ignup with your email
          and password
          or signup with google 
        </p>
        </div>
        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='your name'/>
              <TextInput type='text' placeholder='Username' id='username'onChange={handlechange}/>
            </div>
            <div>
              <Label value='your email'/>
              <TextInput type='email' placeholder='name@gamil.com' id='email'onChange={handlechange}/>
            </div>
            <div>
              <Label value='your password'/>
              <TextInput type='password' placeholder='Username' id='password'onChange={handlechange}/>
            </div>
            
          <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
            {
                loading ? (
                  <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading....</span>
                  </>
                ): 'Signup'
            }
          </Button>
          <Oauth/>

          </form>
          <div className="flex  mt-5 gap-2 text-sm">
          <span>Have an account?</span>
          <Link to='/SignIn' className='text-blue-500'>SignIN</Link>
          </div>
          {errorMessage &&(
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
      
    </div>
  )
}
