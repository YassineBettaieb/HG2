import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user" // Default role
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    let endpoint = '';
    let redirectPath = '';

    // Determine endpoint based on selected role
    switch(formData.role) {
      case 'barber':
        endpoint = '/api/barber/login';
        redirectPath = '/bb';
        break;
      case 'assistant':
        endpoint = '/api/assistant/login';
        redirectPath = '/as';
        break;
      default: // user
        endpoint = '/api/user/login';
        redirectPath = '/hpl';
    }

    const response = await axios.post(`http://localhost:5000${endpoint}`, {
      email: formData.email,
      password: formData.password
    });

    // Store all necessary data
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.id);
    localStorage.setItem('userRole', formData.role); // Store the selected role
    
    // Debugging
    console.log('Login successful. Role:', formData.role);
    console.log('User ID:', response.data.id);
    
    navigate(redirectPath);

  } catch (error) {
    setError(error.response?.data?.message || "Invalid credentials for selected role");
  } finally {
    setLoading(false);
  }
};
  return (
    <>
      <style>
        {`
          .login-header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-bottom: 25px;
            font-size: 26px;
            font-weight: bold;
            color: #d400ff;
          }

          .login-logo {
            width: 150px;
            height: 40px;
            object-fit: contain;
          }

          body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, rgb(250, 244, 192), rgb(92, 46, 110));
            min-height: 100vh;
          }

          .login-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }

          .login-form {
            width: 100%;
            max-width: 420px;
            background-color: #ffffff;
            border: 2px solid #d400ff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
          }

          .login-form h2 {
            text-align: center;
            font-size: 26px;
            margin-bottom: 25px;
            color: #d400ff;
          }

          .login-form .input-group {
            margin-bottom: 16px;
          }

          .login-form .input-group label {
            font-size: 15px;
            color: #333;
            display: block;
            margin-bottom: 6px;
          }

          .login-form .input-group input {
            width: 100%;
            padding: 10px;
            font-size: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          .login-form .input-group input:focus {
            outline: none;
            border-color: #d400ff;
            box-shadow: 0 0 3px #d400ff55;
          }

          .login-form .btn {
            width: 100%;
            padding: 12px;
            background-color: #d400ff;
            color: white;
            font-size: 17px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: 0.3s ease;
          }

          .login-form .btn:hover {
            background-color: #a000cc;
          }

          .login-form .btn:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
          }

          .login-form .link {
            margin-top: 15px;
            text-align: center;
            font-size: 14px;
            color: #333;
          }

          .login-form .register-options {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            gap: 10px;
          }

          .login-form .register-options button {
            flex: 1;
            padding: 10px;
            font-size: 14px;
            background-color: #f0f0f0;
            border: 1px solid #d400ff;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            color: #d400ff;
          }

          .login-form .register-options button:hover {
            background-color: #fbe5ff;
          }

          .error-message {
            color: #ff0000;
            text-align: center;
            margin-bottom: 15px;
            font-size: 14px;
          }

          .role-selector {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
          }

          .role-option {
            flex: 1;
            padding: 10px;
            text-align: center;
            border: 1px solid #d400ff;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
            background-color: ${formData.role === 'user' ? '#fbe5ff' : '#f0f0f0'};
          }

          .role-option.user {
            background-color: ${formData.role === 'user' ? '#d400ff' : '#f0f0f0'};
            color: ${formData.role === 'user' ? 'white' : '#d400ff'};
          }

          .role-option.barber {
            background-color: ${formData.role === 'barber' ? '#d400ff' : '#f0f0f0'};
            color: ${formData.role === 'barber' ? 'white' : '#d400ff'};
          }

          .role-option.assistant {
            background-color: ${formData.role === 'assistant' ? '#d400ff' : '#f0f0f0'};
            color: ${formData.role === 'assistant' ? 'white' : '#d400ff'};
          }

          .role-option:hover {
            background-color: #fbe5ff;
          }
        `}
      </style>

      <div className="login-container">
        <div className="login-form">
          <div className="login-header">
            <Link to="/">
              <img
                src="/img/logo3.png"
                alt="App Logo"
                className="register-logo"
              />
            </Link>
          </div>

          <h2>Login to Your Account</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="role-selector">
              <div 
                className={`role-option user ${formData.role === 'user' ? 'active' : ''}`}
                onClick={() => handleRoleSelect('user')}
              >
                Client
              </div>
              <div 
                className={`role-option barber ${formData.role === 'barber' ? 'active' : ''}`}
                onClick={() => handleRoleSelect('barber')}
              >
                Barber
              </div>
              <div 
                className={`role-option assistant ${formData.role === 'assistant' ? 'active' : ''}`}
                onClick={() => handleRoleSelect('assistant')}
              >
                Assistant
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="link">
              Don't have an account?
              <div className="register-options">
                <button type="button" onClick={() => navigate("/Register")}>
                  Register as Client
                </button>
                <button type="button" onClick={() => navigate("/RegisterB")}>
                  Register as Barber
                </button>
                <button type="button" onClick={() => navigate("/RegisterAs")}>
                  Register as Assistant
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};