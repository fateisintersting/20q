import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Sub/Navbar';

const HomePage = () => {
  return(
    <div >
      <NavBar/>
        <main>
        <Outlet />
      </main>
    </div>

  ) 
};

export default HomePage;
