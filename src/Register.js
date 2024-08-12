import React, { useState } from 'react';
import { registerUser } from './api';
import { useNavigate } from 'react-router-dom';


const Register = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      await registerUser(email, password);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      alert('Registration failed.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
    <section style={{ width: '100%', display:'block' }}>
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
    </section>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
