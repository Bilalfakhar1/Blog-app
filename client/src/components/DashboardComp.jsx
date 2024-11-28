import React from 'react'
import { useState , useEffect} from 'react'
import { HiDocumentText, HiOutlineArrowNarrowUp, HiOutlineUserGroup } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import {Button, Table} from 'flowbite-react'
import {Link} from 'react-router-dom'

export default function DashboardComp() {
    const [users, setUsers]= useState([])
    const [posts, setPosts]= useState([])
    const [totalUsers, setTotalUsers]=  useState(0)
    const [totalPosts, setTotalPosts]= useState(0)
    const [lastMontUsers, setLastMonthUsers] = useState(0)
    const [lastMonthPosts, setLastMonthPosts] = useState(0)
    const {currentUser} = useSelector((state)=> state.user)
    

    useEffect(()=>{
        const fetchUsers = async()=>{
           try {
            const res = await fetch('/api/user/getusers?limit=5')
            const data = await res.json()
            if(res.ok){
                
                setUsers(data.users)
                setTotalUsers(data.totalUsers)
                setLastMonthUsers(data.lastMonthUsers)
            }
           } catch (error) {
            console.log(error.message)
           }
        }
        const fetchPosts = async()=>{
            try {
                const res = await fetch('/api/post/getposts?limit=5')
                const data = await res.json()
                if(res.ok){
                    setPosts(data.posts)
                    setTotalPosts(data.totalPosts)
                    setLastMonthPosts(data.lastMonthPosts)
                }
               } catch (error) {
                console.log(error.message)
               }
        }
        if(currentUser.isAdmin){
            fetchUsers()
            fetchPosts()
        }
    },[currentUser])

  return (
    <div className='p-3 md:mx-auto'>
   <div className="flex-wrap flex gap-4 justify-center">
   <div className="flex flex-col gap-4 p-3 dark:bg-slate-800 md:w-72 w-full rounded-md shadow-md">
        <div className="flex justify-between">
            <div className="">
                <h3 className='text-gray-500 text-md uppercase'>Total user</h3>
                <p>{totalUsers}</p>
            </div>
             <HiOutlineUserGroup className='bg-teal-500 text-white rounded-full p-3 text-5xl shadow-lg'/>
           
        </div>
        <div className='flex gap-2 text-sm'>
                <span className='text-green-500 flex items-center'><HiOutlineArrowNarrowUp/>
                {lastMontUsers}
                </span>
                <div className='text-gray-500'>Last Month</div>
            </div>
      </div>

      <div className="flex flex-col gap-4 p-3 dark:bg-slate-800 md:w-72 w-full rounded-md shadow-md">
        <div className="flex justify-between">
            <div className="">
                <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
                <p>{totalPosts}</p>
            </div>
             <HiDocumentText className='bg-lime-500 text-white rounded-full p-3 text-5xl shadow-lg'/>
           
        </div>
        <div className='flex gap-2 text-sm'>
                <span className='text-green-500 flex items-center'><HiOutlineArrowNarrowUp/>
                {lastMonthPosts}
                </span>
                <div className='text-gray-500'>Last Month</div>
            </div>
      </div>

      
   </div>
   <div className="flex flex-wrap gap-4 justify-center py-7 mx-auto">
    <div className="flex flex-col md:w-auto w-full shadow-md rounded-md p-2 dark:bg-gray-800">
        <div className="flex justify-between p-3 text-sm font-semibold">
            <h3 className='text-center p-2'>Recent Users</h3>
            <Button outline gradientDuoTone='purpleToPink'>
                <Link to={'/dashboard?tab=users'}>See ALL</Link>
            </Button>
        </div>
        <Table hoverable>
            <Table.Head>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {users && users.map((user)=>(
                <Table.Body key={user._id} className='divide-y'>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell><img src={user.profilePicture} alt="user" className='w-10 h-10 rounded-full bg-gray-500'/></Table.Cell>
                        <Table.Cell>{user.username}</Table.Cell>
                    </Table.Row>
                    
                </Table.Body>
            ))}
        </Table>
    </div>

    <div className="flex flex-col md:w-auto w-full shadow-md rounded-md p-2 dark:bg-gray-800">
        <div className="flex justify-between p-3 text-sm font-semibold">
            <h3 className='text-center p-2'>Recent Posts</h3>
            <Button outline gradientDuoTone='purpleToPink'>
                <Link to={'/dashboard?tab=posts'}>See ALL</Link>
            </Button>
        </div>
        <Table hoverable>
            <Table.Head>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Post Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            {posts && posts.map((post)=>(
                <Table.Body key={post._id} className='divide-y'>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell><img src={post.image} alt="user" className='w-14 h-10 rounded-md bg-gray-500'/></Table.Cell>
                        <Table.Cell className='w-96'>{post.title}</Table.Cell>
                        <Table.Cell className='w-5'>{post.category}</Table.Cell>
                    </Table.Row>
                    
                </Table.Body>
            ))}
        </Table>
    </div>
   </div>
    </div>
  )
}
