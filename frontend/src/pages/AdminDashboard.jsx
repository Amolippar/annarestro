import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '' });
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await api.get('/menu');
      setMenu(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddMenu = async (e) => {
    e.preventDefault();
    try {
      await api.post('/menu', { ...newItem, available: true, category: 'Main' });
      setNewItem({ name: '', description: '', price: '' });
      fetchMenu();
    } catch (err) {
      alert('Failed to add item');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <button onClick={logout} className="text-red-500 hover:text-red-700 font-medium">Logout</button>
      </nav>
      
      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold mb-4">Add Menu Item</h2>
          <form onSubmit={handleAddMenu} className="space-y-4">
            <input type="text" placeholder="Name" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" required />
            <textarea placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({...newItem, description: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" required />
            <input type="number" placeholder="Price" value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" required />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Add Item</button>
          </form>
        </div>
        
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4">Manage Menu</h2>
          <div className="space-y-4">
            {menu.map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-500">${item.price}</p>
                </div>
                <button className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
