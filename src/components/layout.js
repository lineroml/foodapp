import React from 'react';
import { useState, useEffect } from 'react';
import Header from './header';

const Layout = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [userData, setUserData] = useState(null);

  const fetchUser = async () => {
    const response = await fetch(`https://foodappdiseno.herokuapp.com/users/${token}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json());
    setUserData(response.data);
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, []);

  return (
    <>
      <Header user={userData} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
