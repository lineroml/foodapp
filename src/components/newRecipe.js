import React from 'react';
import { useState } from 'react';
import Layout from './layout';
import useFormData from '../hooks/useFormData';
import HeadShake from 'react-reveal/HeadShake';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-reveal';

const NewRecipe = () => {
  const [valid, setValid] = useState(true);
  const [shake, setShake] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const { form, formData, updateFormData } = useFormData(null);
  const navigate = useNavigate();

  const placeholderNames = [
    'Raviolis de la Abuela',
    'Pollo al horno',
    'Cerdo al horno',
    'Hígado encebollado',
    'Ensalada César',
    'Tostada Francesa',
  ];

  const randomTime = Math.floor(Math.random() * (180 - 15 + 1)) + 15;

  const randomName = placeholderNames[Math.floor(Math.random() * placeholderNames.length)];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setValid(true);
    console.log(formData);
    if (
      formData.name &&
      formData.description &&
      formData.difficulty &&
      formData.time &&
      formData.difficulty !== 'Seleccione una dificultad'
    ) {
      const request = {
        name: formData.name,
        description: formData.description,
        difficulty: formData.difficulty,
        time: formData.time,
        ingredientes: formData.ingredientes,
        creator: token,
      };
      await fetch('https://foodappdiseno.herokuapp.com/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      }).then((response) => {
        console.log(response.json());
        navigate('/profile/' + token);
      });
    } else {
      setValid(false);
      setShake(true);
    }
  };

  return (
    <Layout>
      <div className='h-screen w-full bg-hero-pattern overflow-x-hidden bg-cover bg-no-repeat'>
        <Fade bottom>
          <section className='w-full opacity-100 sticky top-11 max-w-3xl px-6 py-4 mx-auto mt-16 bg-white rounded-md shadow-md'>
            <h2 className='text-3xl font-semibold text-center text-gray-800'>
              ¡Crea una Receta nueva!
            </h2>
            <p className='mt-3 text-center text-gray-600'>
              ¡Y prepárate para compartirla con el mundo!
            </p>

            <form ref={form} onChange={updateFormData} onSubmit={handleFormSubmit}>
              <div className='mt-6'>
                <div className='items-center -mx-2 md:flex'>
                  <div className='w-full mx-2'>
                    {!valid && (
                      <HeadShake spy={shake}>
                        <span className='text-sm font-semibold text-red-700'>
                          Llena todos los campos!
                        </span>
                      </HeadShake>
                    )}

                    <label className='block mb-2 text-sm font-medium text-gray-600'>
                      Nombre de la Receta
                    </label>

                    <input
                      className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-main-orange focus:ring-main-orange focus:outline-none focus:ring focus:ring-opacity-40'
                      type='text'
                      name='name'
                      placeholder={randomName}
                    />
                  </div>
                </div>

                <div className='items-center -mx-2 md:flex mt-6'>
                  <div className='w-full mx-2'>
                    <label className='block mb-2 text-sm font-medium text-gray-600'>
                      Dificultad
                    </label>

                    <select
                      id='diffs'
                      name='difficulty'
                      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main-orange focus:border-main-orange block w-full p-2.5'
                    >
                      <option selected>Seleccione una dificultad</option>
                      <option value='Facil'>Facil</option>
                      <option value='Medio'>Medio</option>
                      <option value='Dificil'>Difícil</option>
                    </select>
                  </div>

                  <div className='w-full mx-2'>
                    <label className='block mb-2 text-sm font-medium text-gray-600'>
                      Tiempo de preparación (minutos)
                    </label>

                    <input
                      className='block w-full mb-6 px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-main-orange focus:ring-main-orange focus:outline-none focus:ring focus:ring-opacity-40'
                      type='number'
                      name='time'
                      placeholder={randomTime}
                    />
                  </div>
                </div>
                <span className='text-sm text-red-700 font-semibold'>
                  Para separar c/u de los ingredientes presiona enter!
                </span>
                <label className='block mb-2 text-sm font-medium text-gray-600'>
                  {' '}
                  Ingredientes:
                </label>
                <textarea
                  className='block w-full h-40 px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-main-orange focus:outline-none focus:ring focus:ring-main-orange focus:ring-opacity-40'
                  name='ingredientes'
                ></textarea>
                <div className='w-full mt-4'>
                  <span className='text-sm text-red-700 font-semibold'>
                    Para separar c/u de las instrucciones presiona enter!
                  </span>
                  <label className='block mb-2 text-sm font-medium text-gray-600'>
                    Instrucciones:{' '}
                  </label>

                  <textarea
                    className='block w-full h-40 px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-main-orange focus:outline-none focus:ring focus:ring-main-orange focus:ring-opacity-40'
                    name='description'
                  ></textarea>
                </div>

                <div className='flex justify-center mt-6'>
                  <button
                    className='px-4 py-2 text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-gray-600'
                    type='submit'
                  >
                    Crear Receta
                  </button>
                </div>
              </div>
            </form>
          </section>
        </Fade>
      </div>
    </Layout>
  );
};

export default NewRecipe;
