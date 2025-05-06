import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';



export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
    // Add your login logic here
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

          <form onSubmit={handleSubmit}>
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

            <button type="submit" className="btn">Login</button>

            <div className="link">
              Don’t have an account?
              <div className="register-options">
                <button type="button" onClick={() => navigate("/Register")}>
                  Register as Client
                </button>
                <button type="button" onClick={() => navigate("/RegisterB")}>
                  Register as Barber
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
