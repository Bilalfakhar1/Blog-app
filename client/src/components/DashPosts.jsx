import React, { useState  } from 'react'
import { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {useSelector } from 'react-redux'
import {Modal, Table, Button} from 'flowbite-react'
import {HiOutlineExclamationCircle} from 'react-icons/hi'

export default function DashPosts() {
  const {currentUser} = useSelector((state)=> state.user)
  const [userPosts , setUSerPosts] = useState([])
  const[showMore, setShowMore] = useState(true)
  const [showModal , setShowModal] = useState(false)
  const [postIdToDelete , setpostIdToDelete] = useState('')
  useEffect(() => {
    const fetchPost = async()=>{
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data = await res.json()
       if(res.ok){
        setUSerPosts(data.posts)
        if(data.posts.length < 9){
          setShowMore(false)
        }
       }
      } catch (error) {
        console.log(error.message)
      }
    }
    if(currentUser.isAdmin){
      fetchPost()
    }
  }, [currentUser._id])
  const handleShowMore = async ()=>{
    const startIndex = userPosts.length
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
      const data = await res.json()
      if(res.ok){
        setUSerPosts((prev)=>[...prev ,...data.posts])
        if(data.posts.length < 9){
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleDeletePost = async()=>{
    setShowModal(false)
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json()
      if(!res.ok){
        console.log(data.message)
      }else{
        setUSerPosts((prev)=> prev.filter((post)=>post._id !== postIdToDelete))
      }

    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
    dark:scrollbar-track-slate-700  dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
        <Table hoverable className='shadow-md'> 
          <Table.Head>
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          {userPosts.map((post)=>
            <Table.Body className='divide-y'>
              <Table.Row className='bg-white dark:border-gray-600 dark:bg-gray-800'>
                <Table.Cell>{ new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                  <Link to={`/post/${post.slug}`}>
                       <img src={post.image} alt={post.title} className='h-10 w-20 object-cover bg-gray-500' />
                  </Link>
                </Table.Cell>
                <Table.Cell className='font-medium text-gray-900 dark:text-white'>
                  <Link to={`/post/${post.slug}`}>
                  {post.title}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/post/${post.slug}`}>
                  {post.category}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <span onClick={()=>{
                    setShowModal(true)
                    setpostIdToDelete(post._id)
                  }} className='font-medium hover:underline text-red-500 cursor-pointer'>Delete</span>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/update-post/${post._id}`}>
                  <span className='text-teal-500 hover:underline'>Edit</span>
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          )}
        </Table>
        {
          showMore && ( <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>Show More</button>)
        }
        </>
      ):(
        <p>you have no post</p>
      )}
      <Modal show={showModal} onClose={()=> setShowModal(false)} popup size='md' >
        <Modal.Header/>
        <Modal.Body >
            <div className="text-center">
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 m-auto'/>
              <h3 className='text-gray-500 dark:text-gray-400 mb-5 text-lg'>Are you sure you want to delete this post?</h3>
              <div className="flex justify-center gap-8">
                <Button className='w-20' color='failure' onClick={handleDeletePost}>Yes</Button>
                <Button className='w-20' color='gray' onClick={()=>{setShowModal(false)}}>No</Button>
              </div>
            </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
