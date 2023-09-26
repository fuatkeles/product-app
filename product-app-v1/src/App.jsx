import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../src/pages/Login';
import Home from '../src/pages/Home';
import Signup from '../src/pages/Signup';
import { AuthProvider, AuthContext } from '../src/context/AuthContext';
import Brands from './pages/Brands';
import Products from './pages/Products';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/products" element={<Products/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const PrivateRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? <Navigate to="/home" /> : <Login />;
};

export default App;
