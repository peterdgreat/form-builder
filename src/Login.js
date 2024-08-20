import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      navigate('/form-builder');
    } catch (error) {
      alert('Login failed.');
    }
  };

  return (
    <div style={{
      background: 'rgb(43, 46, 74)',
      color: 'white',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        background: '#171B33',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(4px)',
        textAlign: 'center',
        width: '400px',
      }}>
        <h2 style={{ marginBottom: '20px' }}>Log In</h2>
        <div style={{ marginBottom: '20px', position: 'relative' }}>
          <FontAwesomeIcon icon={faEnvelope} style={{
            position: 'absolute',
            top: '50%',
            left: '15px',
            transform: 'translateY(-50%)',
            color: '#ffffffb3',
          }} />
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email"
            style={{
              padding: '12px 12px 12px 45px',
              width: '80%',
              borderRadius: '4px',
              border: '1px solid #3A3D5B',
              backgroundColor: '#0A0C1B',
              color: 'white',
            }}
          />
        </div>
        <div style={{ marginBottom: '30px', position: 'relative' }}>
          <FontAwesomeIcon icon={faLock} style={{
            position: 'absolute',
            top: '50%',
            left: '15px',
            transform: 'translateY(-50%)',
            color: '#ffffffb3',
          }} />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password"
            style={{
              padding: '12px 12px 12px 45px',
              width: '80%',
              borderRadius: '4px',
              border: '1px solid #3A3D5B',
              backgroundColor: '#0A0C1B',
              color: 'white',
            }}
          />
        </div>
        <button onClick={handleLogin} style={{
          padding: '12px 0',
          width: '100%',
          borderRadius: '4px',
          backgroundColor: '#0062ff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}>
          Log In
        </button>
        <div style={{ marginTop: '20px' }}>
          Not registered? 
          <span 
            onClick={() => navigate('/register')}
            style={{
              color: '#0062ff',
              cursor: 'pointer',
              marginLeft: '5px'
            }}>
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;