import React from 'react'
import {TextInput, Select ,FileInput, Button, Alert} from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
export default function CreatePost() {
    const [previewUrl, setPreviewUrl] = useState(null); 
    // State to store the image preview URL
    const [formData , setFromData] = useState({})
    const [publishError , setPublishError] = useState(null)
    const navigate = useNavigate()
    
    const handleImageChange = (event) => {
      const file = event.target.files[0]; // Access the selected file
      if (file) {
        setPreviewUrl(URL.createObjectURL(file)); // Generate the preview URL using URL.createObjectURL
      }
    };
  
    const handleUpload = () => {
      if (previewUrl) {
        console.log('Image ready to upload:', previewUrl);
        // Implement your upload logic here
      }
    };
    const handleSubmit = async (e)=>{
      e.preventDefault()
      try {
        const res = await fetch('/api/post/create',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        const data = await res.json()
        if(!res.ok){
          setPublishError(data.message)
          return
        }
        if(res.ok){
          setPublishError(null)
          navigate(`/post/${data.slug}`)
        }
      } catch (error) {
        setPublishError('Something went wrong')
      }
    }

  
  return (
    <div className='p-3 max-w-3xl min-h-screen mx-auto'>
      <h1 className='text-center text-3xl font-semibold my-7'>Create a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput type='text' placeholder='Title' id='title' required className='flex-1' onChange={(e)=>{setFromData({...formData,title:e.target.value})}}/>
            <Select onChange={(e)=>{setFromData({...formData, category:e.target.value})}}>
                <option value="uncategorized">Select a category</option>
                <option value="javascript">javascript</option>
                <option value="react">react</option>
                <option value="pyhton">pyhton</option>
                <option value="Others">Others</option>
            </Select>
        </div>
        <div className="flex gap-4 items-center border-4 border-teal-500 border-dotted p-3 justify-between">
            <FileInput type='file' accept='image/*' onChange={handleImageChange}/>
            <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>Upload image</Button>
        </div>
        <img
            src={previewUrl}
            alt="Selected"
            className='w-full h-72 mb-12 object-cover'
            />
        <ReactQuill theme='snow' placeholder='write something...' className='h-72 mb-12' required onChange={(value)=>{setFromData({...formData, content:value})}}/>
        <Button type='submit' gradientDuoTone='purpleToPink' >Publish</Button>
        {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
      </form>
    </div>
  )
}
