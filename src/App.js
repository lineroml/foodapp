import Layout from './components/layout';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function App() {
  const [token, setToken] = useState(sessionStorage.getItem('token'));

  const [recipes, setRecipes] = useState(null);

  const fetchAllRecipes = async () => {
    const response = await fetch('https://foodappdiseno.herokuapp.com/recipes', {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json());
    setRecipes(response.data);
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  const navigate = useNavigate();
  if (!token) {
    navigate('/login');
  }

  const parseBgColourFromDifficulty = (difficulty) => {
    switch (difficulty) {
      case 'Facil':
        return 'bg-green-600';
      case 'Medio':
        return 'bg-yellow-600';
      case 'Dificil':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const parseHoverColourFromDifficulty = (difficulty) => {
    switch (difficulty) {
      case 'Facil':
        return 'bg-green-500';
      case 'Medio':
        return 'bg-yellow-500';
      case 'Dificil':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Layout>
      <div className='App w-full h-full '>
        <div className='h-screen w-full flex justify-center bg-hero-pattern overflow-x-hidden bg-cover bg-no-repeat'>
          <div className='w-full h-full max-w-7xl grid sm:grid-cols-2 mt-4 px-16 gap-4 gap-y-2 grid-cols-1'>
            {recipes &&
              recipes.map((recipe) => (
                <Link to={`/recipe/${recipe._id}`}>
                  <div className='bg-white w-full rounded-xl shadow-2xl aspect-square h-auto hover:translate-y-2 transition-all duration-300 ease-in-out'>
                    <img
                      src='/bg-recipe.jpg'
                      alt=''
                      className='w-full h-4/5 object-cover rounded-t-xl'
                    />
                    <div className=' mt-2 px-2 w-full flex  justify-center items-center'>
                      <div className='w-full border-t-2 h-1'></div>
                      <div className='w-max ml-2 font-semibold text-sm '>
                        @{recipe.owner_profile.name}
                      </div>
                    </div>
                    <div className='w-full mt-2 pb-4  px-2 flex justify-between'>
                      <div className='w-full truncate mx-2 font-bold sm:text-xl text-sm underline'>
                        {' '}
                        {recipe.name}
                      </div>
                      <a
                        className={`px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform ${parseBgColourFromDifficulty(
                          recipe.difficulty
                        )} rounded cursor-pointer hover:${parseHoverColourFromDifficulty(
                          recipe.difficulty
                        )}`}
                      >
                        {recipe.difficulty}
                      </a>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
