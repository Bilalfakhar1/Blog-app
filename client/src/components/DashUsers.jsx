import React, { useState  } from 'react'
import { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {useSelector } from 'react-redux'
import {Modal, Table, Button} from 'flowbite-react'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import {FaCheck, FaTimes} from 'react-icons/fa'

export default function DashUsers() {
  const {currentUser} = useSelector((state)=> state.user)
  const [users , setUsers] = useState([])
  const[showMore, setShowMore] = useState(true)
  const [showModal , setShowModal] = useState(false)
  const [userIdToDelete , setUserIdToDelete] = useState('')
  useEffect(() => {
    const fetchUsers = async()=>{
      try {
        const res = await fetch(`/api/user/getusers`)
        const data = await res.json()
       if(res.ok){
        setUsers(data.users)
        if(data.users.length < 9){
          setShowMore(false)
        }
       }
      } catch (error) {
        console.log(error.message)
      }
    }
    if(currentUser.isAdmin){
      fetchUsers()
    }
  }, [currentUser._id])
  const handleShowMore = async ()=>{
    const startIndex = users.length
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`)
      const data = await res.json()
      if(res.ok){
        setUsers((prev)=>[...prev ,...data.users])
        if(data.users.length < 9){
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleDeleteUsers = async()=>{
   try {
    const res = await fetch(`/api/user/delete/${userIdToDelete}`,{
      method: 'DELETE'
    })
    const data = await res.json()
    if(res.ok){
      setUsers((prev)=> prev.filter((user)=> user._id !== userIdToDelete))
      setShowModal(false)
    }else{
      console.log(data.message)
    }
   } catch (error) {
    console.log(error.message)
   }
  }
  
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
    dark:scrollbar-track-slate-700  dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && users.length > 0 ? (
        <>
        <Table hoverable className='shadow-md' > 
          <Table.Head>
            <Table.HeadCell>Date Added</Table.HeadCell>
            <Table.HeadCell>User Image</Table.HeadCell>
            <Table.HeadCell>username</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Admin</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            
          </Table.Head>
          {users.map((user)=>
            <Table.Body className='divide-y' key={user._id}>
              <Table.Row className='bg-white dark:border-gray-600 dark:bg-gray-800'>
                <Table.Cell>{ new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                  
                       <img src={user.profilePicture} alt={user.username} className='h-10 w-10 rounded-full object-cover bg-gray-500' />
                 
                </Table.Cell>
                <Table.Cell className='font-medium text-gray-900 dark:text-white'>
                 
                  {user.username}
               
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.isAdmin ? (<FaCheck className="text-green-500"/>):(<FaTimes  className="text-red-500"/>)}</Table.Cell>
                <Table.Cell>
                  <span onClick={()=>{
                    setShowModal(true)
                    setUserIdToDelete(user._id)
                  }} className='font-medium hover:underline text-red-500 cursor-pointer'>Delete</span>
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
        <p>you have no user</p>
      )}
      <Modal show={showModal} onClose={()=> setShowModal(false)} popup size='md' >
        <Modal.Header/>
        <Modal.Body >
            <div className="text-center">
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 m-auto'/>
              <h3 className='text-gray-500 dark:text-gray-400 mb-5 text-lg'>Are you sure you want to delete this user?</h3>
              <div className="flex justify-center gap-8">
                <Button className='w-20' color='failure' onClick={handleDeleteUsers}>Yes</Button>
                <Button className='w-20' color='gray' onClick={()=>{setShowModal(false)}}>No</Button>
              </div>
            </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
