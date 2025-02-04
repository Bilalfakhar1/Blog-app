import React from 'react'
import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from 'react-icons/ai';
import {GoogleAuthProvider ,signInWithPopup , getAuth} from 'firebase/auth'
import { app } from '../firebase';
import {useDispatch} from 'react-redux'

import {signInSuccess} from '../redux/user/userSlice.js'
import {useNavigate} from 'react-router-dom'
export default function Oauth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = getAuth(app)
    const handlegGoogleclick = async()=>{
           const provider = new GoogleAuthProvider()
           provider.setCustomParameters({prompt: 'select_account'})
           try {
            const resultsFromgoogle = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: resultsFromgoogle.user.displayName,
                    email: resultsFromgoogle.user.email,
                    googlePhotoUrl: resultsFromgoogle.user.photoURL
                })
            })
            const data = await res.json()
            if (res.ok) {
                dispatch(signInSuccess(data))
                navigate('/')
            }
           } catch (error) {
              console.log(error)
           }  
    }
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handlegGoogleclick}>
      <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
      Continue with google
    </Button>
  )
}
