import React, { useState } from 'react';
import { registerUser } from './api';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
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
        <h2 style={{ marginBottom: '20px' }}>Create new account</h2>
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
        <button onClick={handleRegister} style={{
          padding: '12px 0',
          width: '100%',
          borderRadius: '4px',
          backgroundColor: '#0062ff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}>
          Create Account
        </button>
        <div style={{ marginTop: '20px' }}>
          Already a member? 
          <span 
            onClick={() => navigate('/login')}
            style={{
              color: '#0062ff',
              cursor: 'pointer',
              marginLeft: '5px'
            }}>
            Log In
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;