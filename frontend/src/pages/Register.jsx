import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'CUSTOMER' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500" required />
          <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500" required />
          <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500" required />
          <select onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500">
            <option value="CUSTOMER">Customer</option>
            <option value="ADMIN">Admin</option>
            <option value="KITCHEN">Kitchen Staff</option>
          </select>
          <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Sign Up</button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
