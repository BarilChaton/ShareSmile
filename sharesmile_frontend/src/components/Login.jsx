import React from 'react'
import { resolvePath, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

import Logo from '../Assets/Logo/Logo1.png'
import { client } from '../client'

import img1 from '../Assets/LoginPage/1.jpg';
import img2 from '../Assets/LoginPage/2.jpeg';
import img3 from '../Assets/LoginPage/3.jpeg';
import img4 from '../Assets/LoginPage/4.jpg';
import img5 from '../Assets/LoginPage/5.jpg';
import img6 from '../Assets/LoginPage/6.jpeg';
import img7 from '../Assets/LoginPage/7.jpeg';
import img8 from '../Assets/LoginPage/8.jpeg';
import img9 from '../Assets/LoginPage/9.jpg';

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = async (response) => {
    const decoded = jwt_decode(response.credential);
    localStorage.setItem('user', JSON.stringify(decoded));
    const { name, picture, sub } = decoded;
    const user = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    }

    client.createIfNotExists(user)
      .then(() => {
        navigate('/', {replace: true})
      })

    console.log(decoded)
    console.log(user)
  };

  return (
    
    <div className='bg-gray-800 h-screen justify-start' >
      <div className='md:fixed md:grid md:grid-cols-3 md:gap-0 flex flex-col'>
        <div className=''>
            <img src={img1} alt="image 1" />
        </div>
        <div className=''>
          <img src={img2} alt="image 2" />
        </div>
        <div className=''>
          <img src={img5} alt="image 5" />
        </div>
        <div className=''>
          <img src={img6} alt="image 6" />
        </div>
        <div className='-mt-[5vh]'>
          <img src={img4} alt="image 4" />
        </div>
        <div className='md:mt-[2.5vh]'>
          <img src={img8} alt="image 9" />
        </div>
      </div>
      <div className='absolute flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 bg-blackOverlay'>
        <div className='fixed px-[5em] py-[4em] bg-gray-700 border-4 border-mainColor rounded-xl justify-center'>
          <div className='flex justify-center items-center -mt-[4em]'>
            <div className='p-1 my-2 bg-gray-500 rounded-[75%]'>
              <img src={Logo} width="60px" alt="Logo" />
            </div>
            <div className='text-[2em] ml-[5px] font-[Fredoka_One, cursive]'>
              <h1><span className='text-white bg-gray-500 p-1 rounded-l-md'>Share</span><span className='text-gray-500 bg-white p-1 rounded-r-md'>Smile</span></h1>
            </div>
          </div>
          <div className='flex justify-center mt-[8em] scale-150'>
            <GoogleLogin 
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
              onSuccess={(response) => responseGoogle(response)}
              onError={() => console.log('error')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login