import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    if(categoryId) {
      setLoading(true)
      const query = searchQuery(categoryId);
      client.fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false);
        });
    } else {
      setLoading(true);

      client.fetch(feedQuery)
        .then((data) => {
          setPins(data);
          setLoading(false);
        });
    }
  }, [categoryId]);

  const ideaName = categoryId || 'new';
  if (loading) { 
    return ( 
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />);
  }

  if (!pins?.length)
    return (
      <div className='flex justify-center items-center'>
        <h2 className='text-white text-3xl text-center mt-80'>No pins here yet, Care to add some perhaps?</h2>
      </div>
    )

  return (
    <div>
      {pins && (
        <MasonryLayout pins={pins} />
      )}
    </div>
  );
}



// if(!pins?.length) {
//   return (
//   <h2>No pins available!</h2>
// )} else

export default Feed;