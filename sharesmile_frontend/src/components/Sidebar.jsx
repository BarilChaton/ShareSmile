import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { RiHomeSmileFill } from 'react-icons/ri';

import Logo from '../Assets/Logo/Logo1.png';

import { categories } from '../utils/data';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-md text-gray-500 hover:text-white transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 text-md text-white font-extrabold border-r-2 border-white transition-all duration-200 ease-in-out capitalize';

//Categories here

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  }
  return (
    <div className='flex flex-col justify-between bg-gray-800 h-full overflow-y-scroll min-w-210 hide-scrollbar'>
        <div className='flex flex-col'>
          <Link
            to="/"
            onClick={handleCloseSidebar}
          >
            <div className='flex justify-center items-center mb-4 mr-6'>
              <div className='p-1 my-2 bg-gray-500 rounded-[75%] ml-4'>
                <img src={Logo} width="60px" alt="Logo" />
              </div>
              <div className='text-[1.5em] ml-[5px] font-[Fredoka_One, cursive]'>
                <h1><span className='text-white bg-gray-500 p-1 rounded-l-md'>Share</span><span className='text-gray-500 bg-white p-1 rounded-r-md'>Smile</span></h1>
              </div>
            </div>
          </Link>
          <div className='flex flex-col gap-5'>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
              onClick={handleCloseSidebar}
            >
              <RiHomeSmileFill className='text-white text-3xl'/>
              <span>Home</span>
            </NavLink>
            <h3 className='mt-2 px-5 text-base text-gray-400 2xl:text-md border-b-2 border-white'>Discover categories</h3>
            {categories.slice(0, categories.length - 1).map((category) => (
              <NavLink
                to={`/category/${category.name}`}
                className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                onClick={handleCloseSidebar}
                key={category.name}
              >
                <img src={category.image} className='w-10 h-10 rounded-full shadow-sm' alt="category" />
                {category.name}
              </NavLink>
            ))}
          </div>
        </div>
        {user && (
          <Link
            to={`user-profile/${user._id}`}
            className='flex mt-5 my-3 gap-2 p-2 items-center bg-gray-700 rounded-lg shadow-lg text-white mx-3'
            onClick={handleCloseSidebar}
          >
            <img src={user.image} className='w-10 h-10 rounded-full' alt="user-profile" />
            <p>{user.userName}</p>
          </Link>
        )}
    </div>
  )
}

export default Sidebar