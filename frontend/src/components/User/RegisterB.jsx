import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterB = ({ role }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    services: '',
    longitude: '',
    latitude: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState('');
  const navigate = useNavigate();

  // Get current location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          }));
        },
        (error) => {
          setLocationError('Could not get your location. Please enter manually.');
          console.error('Geolocation error:', error);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser. Please enter manually.');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGetLocation = () => {
    setLocationError('');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          }));
        },
        (error) => {
          setLocationError('Could not get your location. Please enter manually.');
          console.error('Geolocation error:', error);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
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
    const barberData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      location: formData.location,
      services: formData.services.split(',').map(service => service.trim()),
      longitude: formData.longitude,
      latitude: formData.latitude
    };

    // Make POST request to your backend API
    const response = await axios.post('http://localhost:5000/api/barber/register', barberData);
    
    // Handle successful registration
    console.log('Barber registration successful:', response.data);
    navigate('/login');
    
  } catch (err) {
    if (err.response) {
      setError(err.response.data.error || err.response.data.message || 'Registration failed');
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
          background: linear-gradient(135deg, #e0f7fa, #b2ffb2);
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
          border: 2px solid #1fa11a;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        }

        .register-form h2 {
          text-align: center;
          font-size: 26px;
          margin-bottom: 25px;
          color: #1fa11a;
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
          border: 1px solid #1fa11a;
          border-radius: 5px;
        }

        .register-form .input-group input:focus {
          outline: none;
          border-color: #1fa11a;
          box-shadow: 0 0 3px #007bff55;
        }

        .register-form .btn {
          width: 100%;
          padding: 12px;
          background-color: #1fa11a;
          color: white;
          font-size: 17px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .register-form .btn:hover {
          background-color: rgb(138, 231, 134);
        }

        .register-form .btn:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }

        .location-btn {
          background-color: #1fa11a;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 5px;
          font-size: 14px;
        }

        .location-btn:hover {
          background-color: rgb(138, 231, 134);
        }

        .coords-container {
          display: flex;
          gap: 10px;
        }

        .coords-container .input-group {
          flex: 1;
        }

        .error-message {
          color: #ff0000;
          text-align: center;
          margin-bottom: 15px;
          font-size: 14px;
        }

        .location-error {
          color: #ff0000;
          font-size: 13px;
          margin-top: -10px;
          margin-bottom: 10px;
        }

        @media screen and (max-width: 600px) {
          .register-form {
            padding: 20px;
            max-width: 90%;
          }

          .register-form h2 {
            font-size: 22px;
          }

          .register-form .input-group input {
            padding: 8px;
            font-size: 14px;
          }

          .register-form .btn {
            font-size: 16px;
            padding: 10px;
          }

          .coords-container {
            flex-direction: column;
            gap: 0;
          }
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
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} pattern="^(\+216)?\d{8}$" required />
            </div>

            <div className="input-group">
              <label htmlFor="location">Location (Address)</label>
              <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder="Ex: Tunis" required />
            </div>

            <div className="input-group">
              
              <div className="coords-container">
                <div className="input-group">
                  <input 
                    type="number" 
                    name="longitude" 
                    value={formData.longitude} 
                    onChange={handleChange} 
                    placeholder="Longitude" 
                    step="any" 
                    required 
                  />
                </div>
                <div className="input-group">
                  <input 
                    type="number" 
                    name="latitude" 
                    value={formData.latitude} 
                    onChange={handleChange} 
                    placeholder="Latitude" 
                    step="any" 
                    required 
                  />
                </div>
              </div>
              <button type="button" className="location-btn" onClick={handleGetLocation}>
                Get My Current Location
              </button>
              {locationError && <div className="location-error">{locationError}</div>}
            </div>

            <div className="input-group">
              <label htmlFor="services">Services (comma separated)</label>
              <input type="text" id="services1" name="services" value={formData.services} onChange={handleChange} placeholder="Ex: Haircut, Beard Trim" required />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </div>

            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterB;