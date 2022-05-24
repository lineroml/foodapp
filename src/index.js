import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css';
import LogIn from './components/logIn';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Profile from './components/profile';
import Recipe from './components/recipe';
import NewRecipe from './components/newRecipe';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/newRecipe' element={<NewRecipe />} />
        <Route path='/recipe/:id' element={<Recipe />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
