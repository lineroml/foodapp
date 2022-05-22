import React from 'react';

const Header = () => {
  return (
    <div className='w-full z-50 md:h-24 h-full bg-white sticky top-0 md:mt-0 mt-2 flex-wrap shadow-xl flex justify-between md:px-10 px-2 items-center'>
      <img src='logo.svg' alt='Logo' className='object-contain aspect-auto h-16' />

      {/* searchbar */}
      <div className='w-3/12 hidden text-gray-600 md:flex'>
        <input
          className='border-b-2 w-full bg-white h-10 px-2 pr-10 focus:border-main-orange transition-all ease-out text-sm outline-none'
          type='search'
          name='search'
          placeholder='Search'
        />
        <button
          type='submit'
          className='-ml-8 w-8 h-8 aspect-square hover:bg-main-orange group bg-white transition-all duration-300 ease-in-out rounded-full'
        >
          <i className='fa-solid fa-magnifying-glass fill-current group-hover:text-white text-main-orange transition-all duration-200 ease-in-out'></i>
        </button>
        <button className='ml-4 bg-main-orange min-w-max font-bold text-sm px-4 rounded-full'>
          Advanced Search
        </button>
      </div>

      <div>
        <button className='mr-6 font-semibold text-sm border-b-2 border-main-orange'>
          Create account
        </button>
        <button className='relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full'>
          <span className='w-full h-full bg-gradient-to-br from-main-orange to-main-blue group-hover:from-main-blue group-hover:to-main-orange absolute'></span>
          <span className='relative flex px-6 py-3 transition-all ease-out bg-white rounded-full group-hover:bg-opacity-0 duration-400'>
            <span className='relative text-black text-sm md:flex hidden'>Log In</span>
            <i className='md:ml-2 ml-0 fa-solid fa-right-from-bracket'></i>
          </span>
        </button>
      </div>

      {/* searchbar for mobile */}
      <div className='w-screen mx-5 my-5 text-gray-600 md:hidden flex flex-col justify-center items-center'>
        <div className='w-full border-t-2 block mb-4' />
        <div className='flex w-full'>
          <input
            className='border-b-2 w-full bg-white h-10 px-2 pr-10 focus:border-main-orange transition-all ease-out text-sm outline-none'
            type='search'
            name='search'
            placeholder='Search'
          />
          <button
            type='submit'
            className='-ml-8 w-8 h-8 aspect-square hover:bg-main-orange group bg-white transition-all duration-300 ease-in-out rounded-full'
          >
            <i className='fa-solid fa-magnifying-glass fill-current group-hover:text-white text-main-orange transition-all duration-200 ease-in-out'></i>
          </button>
          <button className='ml-4 bg-main-orange min-w-max font-bold text-sm px-4 rounded-full'>
            Advanced Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
