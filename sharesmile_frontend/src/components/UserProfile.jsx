import React, { useState, useEffect } from 'react';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { useParams, useNavigate } from 'react-router-dom';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology'

const activeBtnStyles = 'bg-gray-400 mx-4 scale-125 duration-150 ease-in-out text-white p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-gray-800 mx-4 duration-150 ease-in-out text-white p-2 rounded-full w-20 outline-none';

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

  useEffect(() => {
      if(text === 'Created') {
        const createdPinsQuery = userCreatedPinsQuery(userId);

        client.fetch(createdPinsQuery)
          .then((data) =>{
            setPins(data);
          })
      } else {
        const savedPinsQuery = userSavedPinsQuery(userId);

        client.fetch(savedPinsQuery)
          .then((data) =>{
            setPins(data);
          })
      }
    }, [text, userId])
  

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
              <img src={randomImage} alt="Banner-picture" className='w-full border-b-8 border-gray-400 h-370 2xl:h-510 shadow-lg object-cover' />
              <img src={user.image} alt="user-image" className='rounded-full border-8 border-gray-400 lg:w-40 lg:h-40 lg:-mt-20 -mt-12 shadow-xl object-cover' />
              <h1 className='font-bold text-3xl text-white text-center mt-3'>
                {user.userName}
              </h1>
              <div className='absolute flex flex-col justify-between top-1 right-1  p-2 w-auto'>
                <button type="button" className=" flex justify-between gap-2 items-center bg-gray-500 border-2 border-white rounded-xl hover:scale-110 duration-150 ease-in-out p-2"
                        onClick={logout}>
                  <p className='text-white text-lg font-bold'>Logout</p>
                  <RiLogoutCircleRLine color="white" fontSize={21} />
                </button>
              </div>
            </div>
            <div className='text-center mb-7 mt-5'>
              <button type='button' onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn('created');
              }}
              className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}>
                Created
              </button>
              <button type='button' onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn('saved');
              }}
              className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}>
                Saved
              </button>
            </div>
            {pins?.length ? (
            <div className='px-2'>
              <MasonryLayout pins={pins} />
            </div>
            ): (
              <div className='flex justify-center items-center w-full text-xl text-white mt-2'>
                No posts here yet unfortunately :/
              </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default UserProfile