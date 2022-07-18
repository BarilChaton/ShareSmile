import React, { useState, useRef, useEffect } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, Route, Routes } from 'react-router-dom'

import { Sidebar, UserProfile } from '../components'
import Pins from './Pins'
import { userQuery } from '../utils/data'
import { client } from '../client'
import Logo from '../Assets/Logo/Logo1.png'

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState()
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    client.fetch(query).then((data) => {
        setUser(data[0]);
      });
  }, [])
  

  return (
      <div className='flex bg-gray-700 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
        <div className='hidden md:flex h-screen flex-initial'>
          <Sidebar />
        </div>
        <div className='flex md:hidden flex-row'>
          <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)}/>
          <Link to="/">
            <img src={Logo} alt="Logo" className='w-10 p-0.5 bg-gray-500 rounded-[75%]' />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="user-pic" className='w-9 h-9 rounded-full' />
          </Link>
        </div>
        {toggleSidebar && (
          <div className='fixed w-4/5 bg-gray-500 h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
            <div className='absolute w-full flex justify-end items-center p-2'>
              <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => setToggleSidebar(false)}/>
            </div>
          </div>
        )}
      </div>
  )
}

export default Home