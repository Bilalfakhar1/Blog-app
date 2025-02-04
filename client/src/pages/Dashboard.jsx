import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import DashSiderbar from '../components/DashSiderbar'
import DashProfile from '../components/DashProfile'
import DashPosts from '../components/DashPosts'
import DashUsers from '../components/DashUsers'
import DashboardComp from '../components/DashboardComp'

export default function Dashboard() {
  const location = useLocation()
  const [tab , setTab] = useState('')
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromURl = urlParams.get('tab')
   if(tabFromURl){
    setTab(tabFromURl)
   }
  },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        <DashSiderbar/>
      </div>
      {tab === 'profile' && <DashProfile/>}
      {tab === 'posts' && <DashPosts/> }
      {tab === 'users' && <DashUsers/> }
      {tab === 'dash' && <DashboardComp/> }
    </div>
  )
}
