import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ShoppingCart } from 'lucide-react';

const CustomerDashboard = () => {
  const [menu, setMenu] = useState([]);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await api.get('/menu');
        setMenu(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMenu();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Smart Restaurant</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Welcome, {user?.name}</span>
          <button onClick={logout} className="text-red-500 hover:text-red-700 font-medium">Logout</button>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {menu.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
              <p className="text-gray-500 mt-2 line-clamp-2">{item.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">${item.price}</span>
                <button className="flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                  <ShoppingCart size={18} />
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
