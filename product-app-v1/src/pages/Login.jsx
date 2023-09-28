import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "../App.css";
import loginImg from '../assets/Lovepik_com-402451703-login-smart.png';
import { auth } from '../../firebase';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        navigate('/home');
      } else {
        console.error('User not found in the Firebase users table.');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="Logincontainer">
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
