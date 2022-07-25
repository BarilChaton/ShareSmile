import React, { useState, useEffect } from 'react';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { useParams, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology'

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('Created');
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
  }, [userId])

  const logout = () => {
      localStorage.clear();

      navigate('/login');
  } 

  if(!user) {
    return <Spinner message="Loading profile..." />
  }


  return (
    <div className='relative pb-2 h-full justify-center items-center'>
        <div className='flex flex-col pb-5'>
          <div className='relative flex flex-col mb-7'>
            <div className='flex flex-col justify-center items-center'>
              <img src={randomImage} alt="Banner-picture" className='w-full h-370 2xl:h-510 shadow-lg object-cover' />
              <img src={user.image} alt="user-image" className='rounded-full lg:w-40 lg:h-40 lg:-mt-20 -mt-12 shadow-xl object-cover' />
              <h1 className='font-bold text-3xl text-white text-center mt-3'>
                {user.userName}
              </h1>
              <div className='absolute top-0 z-1 right-0 p-2'>
                {userId === user?.sub && (
                      <button
                      type="button"
                      className="px-2"
                      onClick={() => {
                      googleLogout();
                      }}
                      >
                        <RiLogoutCircleRLine color="red" fontSize={21} />
                      </button>
                  )}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default UserProfile