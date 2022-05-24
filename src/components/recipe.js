import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import Layout from './layout';

const Recipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  const fetchRecipe = async () => {
    const response = await fetch(`https://foodappdiseno.herokuapp.com/recipes/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json());
    console.log(response);
    setRecipe(response.data);
  };

  const parseBgColourFromDifficulty = (difficulty) => {
    switch (difficulty) {
      case 'Facil':
        return 'bg-green-600';
      case 'Medio':
        return 'bg-yellow-600';
      case 'Difícil':
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
      case 'Difícil':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  useEffect(() => {
    if (!recipe) {
      fetchRecipe();
    }
  }, []);

  return (
    <Layout>
      <div className='h-screen w-full overflow-y-auto bg-hero-pattern overflow-x-hidden bg-cover bg-no-repeat'>
        {recipe && (
          <div className='max-w-3xl w-full overflow-hidden px-8 py-4 mx-auto bg-white rounded-lg shadow-md mt-12'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-light text-gray-600'>
                {new Date(recipe.recipe.created_at).toLocaleDateString()}
              </span>
              <a
                className={`px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform ${parseBgColourFromDifficulty(
                  recipe.recipe.difficulty
                )} rounded cursor-pointer hover:${parseHoverColourFromDifficulty(
                  recipe.recipe.difficulty
                )}`}
              >
                {recipe.recipe.difficulty}
              </a>
            </div>
            <div className='mt-2 w-full'>
              <p
                href='#'
                className='text-2xl mb-6 font-bold text-gray-700 hover:text-gray-600 underline'
              >
                {recipe.recipe.name}
              </p>
              <div className='w-full h-80 overflow-hidden bg-blue-300 rounded-sm '>
                <img
                  src='/bg-recipe.jpg'
                  alt='bg-recipe'
                  className='w-full h-80 object-cover rounded-md hover:scale-105 transition-all duration-500 ease-in-out'
                />
              </div>
              <div className='font-bold text-2xl mt-6 mb-2 pt-6 w-full border-t-2 border-gray-400 border-opacity-25'>
                {' '}
                Ingredientes:{' '}
              </div>
              {recipe.recipe.ingredients.split('\n').map((item, key) => {
                return (
                  <p key={key} className='text-gray-700 text-lg'>
                    <i class='fa-solid fa-drumstick-bite mr-2'></i>
                    {item}
                  </p>
                );
              })}
              <div className='font-bold text-2xl mt-6 mb-2 pt-6 w-full border-t-2 border-gray-400 border-opacity-25'>
                {' '}
                Instrucciones:{' '}
              </div>
              {recipe.recipe.content.split('\n').map((item, key) => {
                return (
                  <p key={key} className='text-gray-700 text-lg'>
                    <span className='font-bold mr-2'>{`${key + 1}.`}</span>
                    {item}
                  </p>
                );
              })}
            </div>
            <div className='flex items-center justify-between mt-6 pt-6 border-t-2 border-gray-400 border-opacity-25'>
              <div className='flex items-center'>
                <img
                  className='hidden object-cover w-10 h-10 mx-4 rounded-full sm:block'
                  src='/chef.png'
                  alt='avatar'
                />
                <Link to={`/profile/${recipe.author.account_id}`}>
                  <p className='font-bold text-gray-700 cursor-pointer '>
                    Con amor, hecho por{' '}
                    <span className='text-main-orange'> @{recipe.author.name}</span>
                    <i class='ml-2 fa-solid fa-heart fill-current text-red-600'></i>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Recipe;
