import React from 'react'
import { Sidebar } from 'flowbite-react'
import {HiUser, HiArrowSmRight , HiDocumentText , HiOutlineUserGroup, HiChartPie} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { useEffect , useState} from 'react'
import { signoutSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
export default function DashSiderbar() {
  const {currentUser} = useSelector(state => state.user)
  const location = useLocation()
  const dispatch = useDispatch()
  const [tab , setTab] = useState('')
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromURl = urlParams.get('tab')
   if(tabFromURl){
    setTab(tabFromURl)
   }
  },[location.search])
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
  return (
    <Sidebar className='w-full md:w-56'>
       <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1 '>
          {
            currentUser && currentUser.isAdmin && (
              <Link to={'/dashboard?tab=dash'}>
              <Sidebar.Item icon={HiChartPie} as='div' active={tab === 'dash' || !tab}>Dashboard</Sidebar.Item>
              </Link>
            )
          }
            <Link to={'/Dashboard?tab=profile'}>
            <Sidebar.Item active={tab ==='profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin': 'User'} labelColor='dark' as='div'>
                Profile
            </Sidebar.Item>
            </Link>
            {currentUser &&
            <Link to={'/Dashboard?tab=posts'}>
            <Sidebar.Item active={tab === 'posts'} icon= {HiDocumentText} as='div'>
              Post
            </Sidebar.Item>
            </Link>}
            {currentUser.isAdmin &&
            <Link to={'/Dashboard?tab=users'}>
            <Sidebar.Item active={tab === 'users'} icon= {HiOutlineUserGroup} as='div'>
              Users
            </Sidebar.Item>
            </Link>}
            <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout} >
                Sign Out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
       </Sidebar.Items>
    </Sidebar>
  )
}
