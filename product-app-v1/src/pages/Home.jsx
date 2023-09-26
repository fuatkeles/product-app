import React from 'react';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', padding: '20px' }}> 
        <p>Some main content goes here.</p>
      </div>
    </div>
  );
};

export default Home;
