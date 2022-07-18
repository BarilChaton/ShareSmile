import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if(!user) return null;
  return (
    <div className='flex gap-2 md:gap-5 bg-gray-800 w-full mt-1 p-2 rounded-md'>
        <div className='flex justify-start items-center w-full px-1 py-1 rounded-md bg-gray-400 border-none outline-none focus-within:shadow-sm'>
          <IoMdSearch fontSize={30} className='mx-2 text-white' />
            <input 
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              value={searchTerm}
              onFocus={() => navigate('/search')}
              className='p-2 w-full bg-white outline-none rounded-lg'
            />
        </div>
        <div className='flex gap-3'>
          <Link
            to={`user-profile/${user?._id}`} className='hidden md:block' >
            <img src={user.image} alt="user" className='w-12 h-12 rounded-lg' />
          </Link>
          <Link
            to='create-pin' className='bg-gray-400 text-white rounded-lg w-12 h-12 text-2xl md:w-14 md:h-12 flex justify-center items-center' >
            <IoMdAdd />
          </Link>
        </div>
    </div>
  )
}

export default Navbar