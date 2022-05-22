const SearchBar = () => {
  return (
    <div className='w-full text-gray-600 flex'>
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
  );
};

export default SearchBar;
