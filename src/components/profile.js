import React from 'react';
import { useEffect, useState } from 'react';
import Layout from './layout';
import { useNavigate, useParams, Link } from 'react-router-dom';
import useFormData from '../hooks/useFormData';

const Profile = () => {
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [profileData, setProfileData] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const { id } = useParams();
  const [editable, setEditable] = useState(false);
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData(null);

  const fetchUser = async () => {
    const response = await fetch(`https://foodappdiseno.herokuapp.com/users/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json());
    setProfileData(response.data);
  };

  const fetchRecipes = async () => {
    const response = await fetch(
      `https://foodappdiseno.herokuapp.com/recipes/user/${profileData.profile._id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => response.json());
    setRecipes(response.data);
  };

  useEffect(() => {
    if (token) {
      fetchUser();
      if (id === token) {
        setEditable(true);
      }
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
    console.log(recipes);
  }, [profileData]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://foodappdiseno.herokuapp.com/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json());
    if (response.success) {
      setProfileData(response.data);
    } else {
      // refresh the page
      window.location.reload();
    }
  };

  const parseColourFromDifficulty = (difficulty) => {
    switch (difficulty) {
      case 'Facil':
        return 'text-green-500';
      case 'Medio':
        return 'text-yellow-500';
      case 'Difícil':
        return 'text-red-500';
      default:
        return 'text-black';
    }
  };

  return (
    <Layout>
      {profileData && recipes && (
        <div class='h-screen w-full bg-hero-pattern overflow-x-hidden bg-cover bg-no-repeat'>
          <div class='container mx-auto my-5 p-5'>
            <div class='md:flex no-wrap md:-mx-2 '>
              <div class='w-full md:w-3/12 md:mx-2'>
                <div class='bg-white p-3 border-t-4 border-green-400'>
                  <div class='image overflow-hidden'>
                    <img class='h-auto w-full mx-auto' src='/chef.png' alt='' />
                  </div>
                  <h1 class='text-gray-900 font-bold text-xl leading-8 my-1'>
                    {profileData.account.name.first + ' ' + profileData.account.name.last}
                  </h1>
                  <h3 class='text-gray-600 font-lg text-semibold leading-6'>
                    {'@' + profileData.profile.name}
                  </h3>
                  <p class='text-sm text-gray-500 hover:text-gray-600 leading-6'>
                    {profileData.profile.bio || 'Sin Biografía'}
                  </p>
                  <ul class='bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm'>
                    <li class='flex items-center py-3'>
                      {editable ? (
                        <button
                          className='relative mt-6 w-[300px] p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full min-w-max'
                          onClick={handleLogout}
                        >
                          <span className='w-full h-full bg-gradient-to-br from-main-orange to-main-blue group-hover:from-main-blue group-hover:to-main-orange absolute'></span>
                          <span className='relative flex w-full justify-center items-center md:px-6 py-3 transition-all ease-out bg-white rounded-full group-hover:bg-opacity-0 duration-400'>
                            <span className='relative text-black flex text-xl'>Log Out</span>
                          </span>
                        </button>
                      ) : (
                        'xd'
                      )}
                    </li>
                  </ul>
                </div>
                <div class='my-4'>{/* Please leave this empty :) */}</div>
              </div>

              <div class='w-full md:w-9/12 mx-2 h-64'>
                <div class='bg-white p-3 shadow-sm rounded-sm'>
                  <div class='flex items-center space-x-2 font-semibold text-gray-900 leading-8'>
                    <span clas='text-green-500'>
                      <svg
                        class='h-5'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                        />
                      </svg>
                    </span>
                    <span class='tracking-wide'>About</span>
                  </div>
                  {editable ? (
                    <form ref={form} onChange={updateFormData} onSubmit={handleEdit}>
                      <div class='text-gray-700'>
                        <div class='grid md:grid-cols-2 text-sm'>
                          <div class='grid grid-cols-2'>
                            <div class='px-4 py-2 font-semibold'>Nombre</div>
                            <div class='px-4 py-2'>
                              <input
                                type='text'
                                name='firstName'
                                placeholder={profileData.account.name.first}
                              />
                            </div>
                          </div>
                          <div class='grid grid-cols-2'>
                            <div class='px-4 py-2 font-semibold'>Apellido</div>
                            <div class='px-4 py-2'>
                              <input
                                type='text'
                                name='lastName'
                                placeholder={profileData.account.name.last}
                              />
                            </div>
                          </div>
                          <div class='grid grid-cols-2'>
                            <div class='px-4 py-2 font-semibold'>Seguidores</div>
                            <div class='px-4 py-2'>{profileData.profile.followers.length}</div>
                          </div>
                          <div class='grid grid-cols-2'>
                            <div class='px-4 py-2 font-semibold'>Cuentas Seguidas</div>
                            <div class='px-4 py-2'>{profileData.profile.following.length}</div>
                          </div>
                          <div class='grid grid-cols-2'>
                            <div class='px-4 py-2 font-semibold'>Email</div>
                            <div class='px-4 py-2'>
                              <input
                                type='email'
                                name='email'
                                placeholder={profileData.account.email}
                              />
                            </div>
                          </div>
                          <div class='grid grid-cols-2'>
                            <div class='px-4 py-2 font-semibold'>Guardar Cambios</div>
                            <div class='px-4 py-2'>
                              <button
                                type='submit'
                                class='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                              >
                                Guardar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div class='text-gray-700'>
                      <div class='grid md:grid-cols-2 text-sm'>
                        <div class='grid grid-cols-2'>
                          <div class='px-4 py-2 font-semibold'>Nombre</div>
                          <div class='px-4 py-2'>{profileData.account.name.first}</div>
                        </div>
                        <div class='grid grid-cols-2'>
                          <div class='px-4 py-2 font-semibold'>Apellido</div>
                          <div class='px-4 py-2'>{profileData.account.name.last}</div>
                        </div>
                        <div class='grid grid-cols-2'>
                          <div class='px-4 py-2 font-semibold'>Seguidores</div>
                          <div class='px-4 py-2'>{profileData.profile.followers.length}</div>
                        </div>
                        <div class='grid grid-cols-2'>
                          <div class='px-4 py-2 font-semibold'>Cuentas Seguidas</div>
                          <div class='px-4 py-2'>{profileData.profile.following.length}</div>
                        </div>
                        <div class='grid grid-cols-2'>
                          <div class='px-4 py-2 font-semibold'>Email</div>
                          <div class='px-4 py-2'>
                            <a href={`mailto:${profileData.account.email}`}>
                              {profileData.account.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div class='my-4'>{/* Please Leave this empty :) */}</div>

                <div class='bg-white p-3 shadow-sm rounded-sm'>
                  <div class='grid grid-cols-1'>
                    <div>
                      <div class='flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3'>
                        <span clas='text-green-500'>
                          <svg
                            class='h-5'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='2'
                              d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                            />
                          </svg>
                        </span>
                        <span class='tracking-wide'>Recetas</span>
                      </div>
                      <ul class='list-inside space-y-2'>
                        {recipes.length > 0 ? (
                          recipes.map((recipe) => (
                            <Link to={`/recipe/${recipe._id}`}>
                              <li>
                                <div class='text-black bold'>{recipe.name}</div>
                                <div class='text-gray-500 text-xs'>
                                  {`Tiempo Aproximado: ${recipe.prepare_time} Mins - `}
                                  <span
                                    className={parseColourFromDifficulty(recipe.difficulty)}
                                  >{`${recipe.difficulty}`}</span>
                                </div>
                                <div class='text-gray-500 text-xs'>{`Receta creada el: ${new Date(
                                  recipe.created_at
                                ).toLocaleDateString()}`}</div>
                              </li>
                            </Link>
                          ))
                        ) : (
                          <li>
                            <div class='text-black bold'>No has creado ninguna receta :c</div>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
