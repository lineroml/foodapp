import React from 'react';
import Fade from 'react-reveal/Fade';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useFormData from '../hooks/useFormData';
import HeadShake from 'react-reveal/HeadShake';

const LogIn = () => {
  const [shown, setShown] = useState(0);
  const [shakeVar, setShakeVar] = useState(false);
  const navigate = useNavigate();
  const {
    form: formLog,
    formData: formDataLog,
    updateFormData: updateFormDataLog,
  } = useFormData(null);
  const {
    form: formReg,
    formData: formDataReg,
    updateFormData: updateFormDataReg,
  } = useFormData(null);

  function handleHome() {
    navigate('/');
  }

  async function handleLogin(e) {
    e.preventDefault();

    // check if every input is filled
    if (!formDataLog.username || !formDataLog.password) {
      setShakeVar(!shakeVar);
      console.log(formDataLog);
    } else {
      // send data to backend in post
      const response = await fetch('https://foodappdiseno.herokuapp.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataLog),
      }).then((res) => res.json());
      // if login is successful, redirect to home
      console.log('response: ', response);
      if (response.success) {
        sessionStorage.setItem('token', response.data._id);
        navigate('/');
      } else {
        //! TODO: show error message
      }
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    const response = await fetch('https://foodappdiseno.herokuapp.com/login/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataReg),
    }).then((res) => res.json());
    // if login is successful, redirect to home
    if (response.success) {
      console.log('response: ', response);
      sessionStorage.setItem('token', response.data._id);
      navigate('/');
    } else {
      //! TODO: show error message
    }
  }

  return (
    <Fade big duration={300}>
      <div className='w-full h-screen flex md:flex-row flex-col overflow-hidden '>
        <div className='md:w-1/2 w-screen h-screen md:h-full md:flex md:relative fixed bg-login bg-center bg-cover bg-no-repeat md:border-r-main-orange md:border-r-8'></div>
        <div className='md:w-0 md:h-full h-0 w-full md:border-r-main-blue md:border-r-8 border-t-main-blue border-t-8'></div>
        <div className='md:w-1/2 w-screen -mt-2 md:mt-0 h-screen flex flex-col justify-center items-center z-30 bg-white md:bg-opacity-0 bg-opacity-60'>
          <Fade top>
            <img src='logo.svg' alt='Logo' className='object-contain aspect-auto h-40' />
          </Fade>
          <Fade bottom opposite when={shown === 0} collapse>
            <div
              className={`transition-all duration-200 w-full flex-col justify-center items-center flex`}
            >
              <span className='max-w-md text-center text-2xl mt-4'>
                Welcome to the <span className='font-extrabold'>best</span> cooking community in the
                world.
              </span>
              <button
                className='relative mt-6 w-[300px] p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full  min-w-max'
                onClick={() => setShown(2)}
              >
                <span className='w-full h-full bg-gradient-to-br from-main-orange to-main-blue group-hover:from-main-blue group-hover:to-main-orange absolute'></span>
                <span className='relative flex w-full justify-center items-center md:px-6 py-3 transition-all ease-out bg-white rounded-full group-hover:bg-opacity-0 duration-400'>
                  <span className='relative text-black flex text-xl'>Create account</span>
                </span>
              </button>
              <button
                className='relative mt-2 w-[300px] p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full min-w-max'
                onClick={() => setShown(1)}
              >
                <span className='w-full h-full bg-gradient-to-br from-main-orange to-main-blue group-hover:from-main-blue group-hover:to-main-orange absolute'></span>
                <span className='relative flex w-full justify-center items-center md:px-6 py-3 transition-all ease-out bg-none rounded-full group-hover:bg-opacity-0 duration-400'>
                  <span className='relative text-black flex text-xl'>Log In</span>
                </span>
              </button>
              <button
                className=' mt-4 font-semibold text-sm border-b-2 border-main-orange'
                onClick={handleHome}
              >
                Return home
              </button>
            </div>
          </Fade>
          <Fade bottom opposite when={shown === 1} collapse>
            <div
              className={`transition-all duration-200 w-full flex-col justify-center items-center flex`}
            >
              <form
                ref={formLog}
                onSubmit={handleLogin}
                onChange={updateFormDataLog}
                className='w-full flex-col justify-center items-center flex'
              >
                <HeadShake spy={shakeVar}>
                  <span className='text-sm font-semibold text-red-700'>
                    Be sure to fill everything!
                  </span>
                </HeadShake>
                <input
                  className='border-b-2 w-[350px] bg-white h-10 px-2 focus:border-main-orange transition-all ease-out text-sm outline-none'
                  type='username'
                  name='username'
                  placeholder='Username'
                  required
                />
                <input
                  className='border-b-2 mt-6 w-[350px] bg-white h-10 px-2 focus:border-main-orange transition-all ease-out text-sm outline-none'
                  type='password'
                  name='password'
                  placeholder='Password'
                  required
                />
                <button
                  className='relative mt-6 w-[300px] p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full min-w-max'
                  onClick={handleLogin}
                >
                  <span className='w-full h-full bg-gradient-to-br from-main-orange to-main-blue group-hover:from-main-blue group-hover:to-main-orange absolute'></span>
                  <span className='relative flex w-full justify-center items-center md:px-6 py-3 transition-all ease-out bg-none rounded-full group-hover:bg-opacity-0 duration-400'>
                    <span className='relative text-black flex text-xl'>Log In</span>
                  </span>
                </button>
                <div>
                  <button
                    className=' mt-4 font-semibold text-sm border-b-2 border-main-orange'
                    onClick={() => {
                      setShown(2);
                    }}
                  >
                    Create Account
                  </button>
                  <button
                    className='ml-4  mt-4 font-semibold text-sm border-b-2 border-main-orange'
                    type='submit'
                  >
                    Return Home
                  </button>
                </div>
              </form>
            </div>
          </Fade>
          <Fade bottom opposite when={shown === 2} collapse>
            <div
              className={`transition-all duration-200 w-full flex-col justify-center items-center flex`}
            >
              <form
                ref={formReg}
                onSubmit={handleRegister}
                onChange={updateFormDataReg}
                className='w-full flex-col justify-center items-center flex'
              >
                <HeadShake spy={shakeVar}>
                  <span className='text-sm font-semibold text-red-700'>
                    Be sure to fill everything!
                  </span>
                </HeadShake>
                <input
                  className='border-b-2 w-[350px] bg-white h-10 px-2 focus:border-main-orange transition-all ease-out text-sm outline-none'
                  type='text'
                  name='name'
                  placeholder='Name'
                  required
                />
                <input
                  className='border-b-2 mt-6 w-[350px] bg-white h-10 px-2 focus:border-main-orange transition-all ease-out text-sm outline-none'
                  type='text'
                  name='lastName'
                  placeholder='Last Name'
                  required
                />
                <input
                  className='border-b-2 mt-6 w-[350px] bg-white h-10 px-2 focus:border-main-orange transition-all ease-out text-sm outline-none'
                  type='email'
                  name='email'
                  placeholder='Email'
                  required
                />
                <input
                  className='border-b-2 mt-6 w-[350px] bg-white h-10 px-2 focus:border-main-orange transition-all ease-out text-sm outline-none'
                  type='username'
                  name='username'
                  placeholder='Username'
                  required
                />
                <input
                  className='border-b-2 mt-6 w-[350px] bg-white h-10 px-2 focus:border-main-orange transition-all ease-out text-sm outline-none'
                  type='password'
                  name='password'
                  placeholder='Password'
                  required
                />
                <input
                  className='border-b-2 mt-6 w-[350px] bg-white h-10 px-2 focus:border-main-orange transition-all ease-out text-sm outline-none'
                  type='password'
                  name='confPassword'
                  required
                  placeholder='Confirm password'
                />
                <button
                  className='relative mt-6 w-[300px] p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full min-w-max'
                  type='submit'
                >
                  <span className='w-full h-full bg-gradient-to-br from-main-orange to-main-blue group-hover:from-main-blue group-hover:to-main-orange absolute'></span>
                  <span className='relative flex w-full justify-center items-center md:px-6 py-3 transition-all ease-out bg-none rounded-full group-hover:bg-opacity-0 duration-400'>
                    <span className='relative text-black flex text-xl'>Create Account</span>
                  </span>
                </button>
                <div>
                  <button
                    className=' mt-4 font-semibold text-sm border-b-2 border-main-orange'
                    onClick={() => setShown(1)}
                  >
                    Log In
                  </button>
                  <button
                    className='ml-4  mt-4 font-semibold text-sm border-b-2 border-main-orange'
                    onClick={handleHome}
                  >
                    Return Home
                  </button>
                </div>
              </form>
            </div>
          </Fade>
        </div>
      </div>
    </Fade>
  );
};

export default LogIn;
