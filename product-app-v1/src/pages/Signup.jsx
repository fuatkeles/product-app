import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import "../App.css"
import loginImg from '../assets/Lovepik_com-402451703-login-smart.png';


const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        firstName,
        lastName,
        email,
      });

      console.log('Signup successful and user data saved to Firestore.');
      navigate('/login'); // Signup başarılıysa login sayfasına yönlendir
    } catch (error) {
      console.error('Signup failed', error.message);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="signupContainer">
      <div className="signupFormContainer">
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSignup}>
          <TextField
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            margin="normal"
            className="signupInput"
          />
          <TextField
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            margin="normal"
            className="signupInput"
          />
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            className="signupInput"
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            className="signupInput"
          />
          <Button type="submit" variant="contained" color="primary" className="signupButton">
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" className="loginRedirect" onClick={handleLoginRedirect}>
          Already have an account? Login
        </Typography>
      </div>
      <div className="signupimageContainer">
        <img src={loginImg} alt="Signup Image" className="image" />
      </div>
    </div>
  );
};

export default Signup;
