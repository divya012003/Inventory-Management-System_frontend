import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from '../axios';


const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/register', form);
      login(res.data.token);
      alert("Registration successful!");
      navigate('/products');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="login-container">
      <div className="form-box">
        <h2>Register Form</h2>
        <div className="toggle">
          <button onClick={() => navigate('/login')}>Login</button>
          <button className="active">Signup</button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
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
          <button className="submit-btn" type="submit">Register</button>
        </form>

        <p className="bottom-text">
          Already have an account? <span onClick={() => navigate('/login')}>Login now</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
