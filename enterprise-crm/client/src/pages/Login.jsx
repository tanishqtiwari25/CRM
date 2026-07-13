import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import { Code } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/login', { email, password });
      login(response.data);
      navigate('/');
    } catch (err) {
      alert('Authentication exception thrown: verification structural match error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-6">
        <div className="flex flex-col items-center">
          <div className="p-3 bg-indigo-600/10 rounded-xl text-indigo-500 mb-2">
            <Code size={32} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Access Identity Center</h2>
          <p className="text-slate-400 text-sm mt-1">Authenticate access to node engine workspace</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Corporate Email Address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Secure Account Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm" />
          </div>
          <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-lg transition-all shadow-lg shadow-indigo-600/20">Authorize and Synchronize</button>
        </form>
      </div>
    </div>
  );
}