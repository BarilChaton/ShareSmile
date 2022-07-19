import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'   

import { client, urlFor } from '../client'

const Pin = ({ pin }) => {
    const [postHovered, setPostHovered] = useState(false);
    const [savingPost, setSavingPost] = useState(false);
    const navigate = useNavigate();
    const { postedBy, image, _id, destination } = pin;

    const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    let alreadySaved = pin?.save?.filter((item) => item?.postedBy?._id === user?.googleId);

    alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

    const deletePin = (id) => {
        client
            .delete(id)
            .then(() => {
                window.location.reload();
            });
    };
  
    const savePin = (id) => {
      if (alreadySaved?.length === 0) {
        setSavingPost(true);
  
        client
          .patch(id)
          .setIfMissing({ save: [] })
          .insert('after', 'save[-1]', [{
            _key: uuidv4(),
            userId: user?.googleId,
            postedBy: {
              _type: 'postedBy',
              _ref: user?.googleId,
            },
          }])
          .commit()
          .then(() => {
            window.location.reload();
            setSavingPost(false);
          });
      }
    };

  
    return (
    <div className='m-2 border-4 border-gray-400 rounded-xl'>
        <div
            onMouseEnter={() => setPostHovered(true)}
            onMouseLeave={() => setPostHovered(false)}
            onClick={() => navigate(`/pin-detail/${_id}`)}
            className='relative cursor-zoom-in w-auto hover:shadow-lg overflow-hidden transition-all duration-500 ease-in-out'
        >
            {image && (
            <img className='rounded-t-lg w-full' src={urlFor(image).width(250).url()} alt="user-post" /> )}
            {postHovered && (
                <div
                    className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
                    style={{ height: '100%' }}
                >
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-2'>
                            <a 
                                href={`${image?.asset?.url}?dl=`}
                                download
                                onClick={(e) => e.stopPropagation()}
                                className='bg-white w-9 h-9 text-gray-600 text-3xl rounded-full flex items-center justify-center hover:scale-110 duration-100 outline-none'
                            >
                                <MdDownloadForOffline />
                            </a>
                        </div>
                        {alreadySaved !== 0 ? (
                            <button type='button' className='bg-white hover:scale-110 duration-100 text-gray-600 font-bold px-5 py-1 text-base rounded-3xl outline-none'>
                               {pin?.save?.length} Saved
                            </button>
                        ) : (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    savePin(_id);
                                }}
                                type='button' 
                                className='bg-gray-600 hover:scale-110 duration-100 text-white font-bold px-5 py-1 text-base rounded-3xl outline-none'
                                >
                                {pin?.save?.length}   {savingPost ? 'Saving' : 'Save'}
                            </button>
                        )}
                    </div>
                    <div className='flex justify-between items-center gap-2 w-full'>
                        {destination?.slice(8).length > 0 ? (
                            <a 
                                href={destination}
                                target="_blank"
                                className="bg-gray-600 flex items-center ml-2 gap-2 text-white font-bold p-2 pl-4 pr-4 rounded-full hover:scale-110 duration-100"
                                rel="noreferrer"
                            >
                                {' '}
                                <BsFillArrowUpRightCircleFill className='text-white' />
                                {destination.length > 20 ? destination.slice(8, 17) : destination.slice(8)}
                            </a>
                        ) : undefined}
                        {
                            postedBy?._id === user?.googleId && (
                            <button
                            type='button'
                            onClick={(e) => {
                                e.stopPropagation();
                                deletePin(_id);
                            }}
                            className='bg-gray-600 flex justify-center items-center gap-2 h-8 w-8 text-white font-bold p-2 rounded-full hover:bg-red-700 hover:scale-110 duration-100'
                            >
                                <RiDeleteBin2Fill />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
        <Link to={`user-profile/${postedBy?._id}`} className='flex gap-2 p-2 items-center bg-gray-500 rounded-b-lg'>
            <img src={postedBy?.image} alt="user-profile" className='w-8 h-8 rounded-full object-cover' />
            <p className='text-white capitalize'>{postedBy.userName}</p>
        </Link>
    </div>
    )
}

export default Pin