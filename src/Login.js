import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './api';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // const handleLogin = async () => {
  //   try {
  //     const data = await loginUser(email, password);
  //     console.log('Token received:', data.token); // Debugging statement
  //     setToken(data.token);
  //     navigate('/form-builder');
  //   } catch (error) {
  //     alert('Login failed.');
  //     console.error(error);
  //   }
  // };
  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);
      console.log('Token received:', data.token); // Debugging
      localStorage.setItem('token', data.token);
      setToken(data.token);
      navigate('/form-builder');
    } catch (error) {
      alert('Login failed.');
      console.error(error);
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;