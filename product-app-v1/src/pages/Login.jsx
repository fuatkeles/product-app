import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "../App.css"
import loginImg from '../assets/Lovepik_com-402451703-login-smart.png';



const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate('/home');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="container">
      <div className="formContainer">
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inputField"
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="passwordField"
          />
          <Button type="submit" variant="contained" color="primary" className="submitButton">
            Login
          </Button>
        </form>
        <Typography className='signupText' variant="body2" gutterBottom onClick={handleSignupClick}>
          Don't have an account? Signup Now
        </Typography>
      </div>
      <div className="imageContainer">
        <img src={loginImg} alt="Image" className="image" />
      </div>
    </div>
  );
};

export default Login;
