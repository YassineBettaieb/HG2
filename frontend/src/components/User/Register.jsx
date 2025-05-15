import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ role }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation checks
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setIsLoading(true);
      
      // Prepare the data to send to backend
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone
      };

      
      const response = await axios.post('http://localhost:5000/user/register', userData);
      
      
      console.log('Registration successful:', response.data);
      navigate('/login'); 
      
    } catch (err) {
      
      if (err.response) {
        
        setError(err.response.data.message || 'Registration failed');
      } else if (err.request) {
       
        setError('No response from server. Please try again.');
      } else {
       
        setError('Error: ' + err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
        .register-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 25px;
          font-size: 26px;
          font-weight: bold;
          color: #1fa11a;
        }

        .register-logo {
          width: 150px;
          height: 40px;
          object-fit: contain;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #e0f7fa, #8bccf8);
          min-height: 100vh;
        }

        .register-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }

        .register-form {
          width: 100%;
          max-width: 420px;
          background-color: #ffffff;
          border: 2px solid #007bff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        }

        .register-form h2 {
          text-align: center;
          font-size: 26px;
          margin-bottom: 25px;
          color: #007bff;
        }

        .register-form .input-group {
          margin-bottom: 16px;
        }

        .register-form .input-group label {
          font-size: 15px;
          color: #333;
          display: block;
          margin-bottom: 6px;
        }

        .register-form .input-group input {
          width: 100%;
          padding: 10px;
          font-size: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .register-form .input-group input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 3px #007bff55;
        }

        .register-form .btn {
          width: 100%;
          padding: 12px;
          background-color: #007bff;
          color: white;
          font-size: 17px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .register-form .btn:hover {
          background-color: #0056b3;
        }

        .register-form .btn:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }

        .error-message {
          color: #ff0000;
          text-align: center;
          margin-bottom: 15px;
          font-size: 14px;
        }
        `}
      </style>

      <div className="register-container">
        <div className="register-form">
          <div className="register-header">
            <Link to="/">
              <img
                src="/img/logo3.png"
                alt="App Logo"
                className="register-logo"
              />
            </Link>
          </div>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: HG"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ex: HG@gmail.com"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                pattern="^(\+216)?\d{8}$"
                placeholder="Ex: +21612345678 or 12345678"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;