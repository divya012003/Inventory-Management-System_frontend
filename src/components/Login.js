import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from '../axios';
// import './Login.css'; // Uncomment if you create a CSS file for styling

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/login', form);
      const token = res.data.token;

      if (!token) {
        alert('No token received');
        return;
      }

      login(token);
      alert('Login successful!');
      navigate('/products');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="form-box">
        <h2>Login Form</h2>
        <div className="toggle">
          <button className="active">Login</button>
          <button onClick={() => navigate('/register')}>Signup</button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <div className="forgot">Forgot password?</div>
          <button className="submit-btn" type="submit">Login</button>
        </form>

        <p className="bottom-text">
          Not a member? <span onClick={() => navigate('/register')}>Signup now</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
