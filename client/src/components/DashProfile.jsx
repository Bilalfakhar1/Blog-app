import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import React, { useEffect } from 'react'
import { useState , useRef } from 'react'
import { useSelector } from 'react-redux'
import {updateStart , updateSuccess , updateFailure , deleteUserStart ,deleteUserSuccess , deleteUserFailure , signoutSuccess} from '../redux/user/userSlice.js'
import { useDispatch } from 'react-redux'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import {Link} from 'react-router-dom'
function DashProfile() {
    const {currentUser , error , loading} = useSelector((state)=> state.user)
    const [imageFile , setImageFile] = useState(null)
    const [imageUrl , setImageFileUrl] = useState(null)
    const filePickerRef = useRef()
    const [updateUserSuccess , setUpdateUserSuccess] = useState(null)
    const [updateUserError , setUpdateUserError]  = useState(null)
    const [showModal , setShowModal] = useState(false)
    const [formData, setFormData] = useState({
      username: currentUser.username || '',
      email: currentUser.email || '',
      password: '',
    });
    const handleImageChange = (e)=>{
      const file =   e.target.files[0]
      if(file){
        setImageFile(file)
        setImageFileUrl(URL.createObjectURL(file))
      }
    }
 useEffect(()=>{
    if(imageFile){
        uploadImage()
    }
 },[imageFile])
 const uploadImage = async ()=>{
    console.log('uploadImage.....')
    // onChange={handleChange}
 }
 const handleChange =(e) =>{
  setFormData({...formData , [e.target.id]: e.target.value})
}

const handleSubmit = async (e) =>{
  e.preventDefault();
  setUpdateUserSuccess(null)
  setUpdateUserError(null)
  if(Object.keys(formData).length === 0){
    setUpdateUserError("No changes made");
    return;
  }
  try {
    dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    const data = await res.json()
    if(!res.ok){
      dispatch(updateFailure(data.message))
      setUpdateUserError(data.message)
    }else{
      dispatch(updateSuccess(data))
      setUpdateUserSuccess('User profile updated successfully')
    }
  } catch (error) {
    dispatch(updateFailure(error.message))
    setUpdateUserError(error.message)
  }
}
const handleDeleteUser = async ()=>{
setShowModal(false)
try {
  dispatch(deleteUserStart())
  const res = await fetch (`/api/user/delete/${currentUser._id}`,{
    method: 'DELETE',
  })
  const data = await res.json()
  if(!res.ok){
    dispatch(deleteUserFailure(data.message))
  }else{
    dispatch(deleteUserSuccess(data))
  }
 
} catch (error) {
  dispatch(deleteUserFailure(error.message))
}
}
const handleSignout = async ()=>{
  try {
    const res = await fetch ('/api/user/signout',{
      method: 'POST'
    })
    const data = await res.json()
    if(!res.ok){
      console.log(data.message)
    }else{
        dispatch(signoutSuccess())
    }
  } catch (error) {
    
  }
}
const dispatch = useDispatch()
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
        <input type="f onchange={}ile" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full ">
        <img src={imageUrl || currentUser.profilePicture} alt="user" className=' rounded-full w-full object-cover border-8 border-[lightgray]' onClick={()=> filePickerRef.current.click()}/>
        </div>
       <TextInput type='text' id='username' placeholder='UserName' defaultValue={currentUser.username} onChange={handleChange}/>
       <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange}/>
       <TextInput type='password' id='password' placeholder='password'  onChange={handleChange}/>
       <Button type='submit' gradientDuoTone='purpleToBlue' outline disabled={loading}>
        {loading ? 'Loading...' : 'Update'}
       </Button>
       {currentUser &&(
         <Link to={'/create-post'}>
         <Button type='button' className='w-full' gradientDuoTone='purpleToPink'> Create Post</Button>
         </Link>
       )}
      
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={()=>setShowModal(true)} className='cursor-pointer' >Delete Account</span>
        <span className='cursor-pointer' onClick={handleSignout} >Sign Out</span>
      </div>
      {updateUserSuccess &&(
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      ) 

      }
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )

      }
         {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )

      }
      <Modal show={showModal} onClose={()=> setShowModal(false)} popup size='md' >
        <Modal.Header/>
        <Modal.Body >
            <div className="text-center">
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 m-auto'/>
              <h3 className='text-gray-500 dark:text-gray-400 mb-5 text-lg'>Are you sure you want to delete your account?</h3>
              <div className="flex justify-center gap-8">
                <Button className='w-20' color='failure' onClick={handleDeleteUser}>Yes</Button>
                <Button className='w-20' color='gray' onClick={()=>{setShowModal(false)}}>No</Button>
              </div>
            </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashProfile
