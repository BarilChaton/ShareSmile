import React, { useState, useEffect } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();

  const addComment = () => {
    if(comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({comments: []})
        .insert('after', 'comments[-1]', [{
        comment, 
        _key: uuidv4(),
        postedBy: {
          _type: 'postedBy', 
          _ref: user._id
        }
      }])
      .commit()
      .then(() => {
        fetchPinDetails();
        setComment('');
        setAddingComment(false)
      })
    }
  }

  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);

    if(query) {
      client.fetch(`${query}`)
        .then((data) => {
          setPinDetail(data[0]);

          if(data[0]) {
            const query1 = pinDetailMorePinQuery(data[0]);

            client.fetch(query1)
              .then((res) => setPins(res));
          }
        })
    }
  }

  useEffect(() => {
    fetchPinDetails();
  }, [pinId])

  if(!pinDetail) return <Spinner message="Loading Pin..." />;

  return (
    <>
    <div className='flex xl:flex-row flex-col m-auto mt-10 bg-gray-400 rounded-xl p-4' style={{ maxWidth: '1500px', borderRadious: '32px' }}>
      <div className='flex justify-center items-center md:items-start flex-inital'>
        <img src={pinDetail?.image && urlFor(pinDetail.image).url()} alt="user-post"
        className='rounded-3xl'
        />
      </div>
      <div className='w-full p-5 flex-1 xl:min-w-620'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <a 
            href={`${pinDetail.image?.asset?.url}?dl=`}
            download
            onClick={(e) => e.stopPropagation()}
            className='bg-white w-9 h-9 text-gray-600 text-3xl rounded-full flex items-center justify-center hover:scale-110 duration-100 outline-none'
            >
              <MdDownloadForOffline />
            </a>
          </div>
          <a href={pinDetail.destination} target="_blank" rel="noreferrer" >
            {pinDetail.destination.length > 20 ? pinDetail.destination.slice(8, 28) : pinDetail.destination.slice(8)}
          </a>
        </div>
        <div>
          <h1 className='text-4xl font-bold break-words mt-3'>
            {pinDetail.title}
          </h1>
          <p className='mt-3 '>
            {pinDetail.about}
          </p>
        </div>
        <Link to={`user-profile/${pinDetail.postedBy?._id}`} className='flex gap-2 p-2 items-center rounded-lg mt-5'>
            <img src={pinDetail.postedBy?.image} alt="user-profile" className='w-8 h-8 rounded-full object-cover' />
            <p className='text-white capitalize'>{pinDetail.postedBy.userName}</p>
        </Link>
        <h2 className='mt-5 text-2xl'>
          Comments
        </h2>
        <div className='max-h-370 overflow-y-auto'>
          {pinDetail?.comments?.map((comment, i) => (
            <div className='flex gap-2 p-2 mt-5 items-center bg-gray-500 rounded-lg' key={i}>
              <img 
                src={comment.postedBy.image}
                alt="user-profile"
                className='w-10 h-10 rounded-full cursor-pointer'
              />
              <div className='flex flex-col'>
                <p className='text-white'>
                  {comment.postedBy.userName + ': '}
                  {comment.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-wrap mt-6 gap-3'>
          <Link to={`user-profile/${pinDetail.postedBy?._id}`}>
            <img src={pinDetail.postedBy?.image} alt="user-profile" className='w-10 h-10 rounded-full cursor-pointer' />
          </Link>
          <input
            className='flex-1 border-gray-400 outline-none border-2 p-2 rounded-2xl focus:border-gray-800'
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type='button'
            className='bg-gray-600 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'
            onClick={addComment}
          >
            {addingComment ? 'Posting the comment...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
    {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4 text-white">
          More like this
        </h2>
      )}
      {pins ? (
        <MasonryLayout pins={pins} />
      ) : (
        <Spinner message="Loading more pins" />
      )}
    
    </>
  )
}

export default PinDetail