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

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🟢 Hardcoded Credentials for Portfolio/Testing
    const adminEmail = "admin@enterprise.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
      const dummyUser = { token: 'mock-token', user: { name: 'Admin', email: email } };
      login(dummyUser); 
      navigate('/');
    } else {
      // 🔴 Galat password par error state ya alert
      alert('Authentication failed: Invalid identity credentials.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#020617', padding: '0 16px' }}>
      <div style={{ maxWidth: '448px', width: '100%', backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '32px', borderRadius: '16px', boxSizing: 'border-box' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ padding: '12px', backgroundColor: 'rgba(79, 70, 229, 0.1)', borderRadius: '12px', color: '#6366f1', marginBottom: '8px' }}>
            <Code size={32} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#ffffff', margin: '0', letterSpacing: '-0.025em' }}>Access Identity Center</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '4px 0 0 0' }}>Authenticate access to node engine workspace</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Email Group */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: '#94a3b8' }}>
              Corporate Email Address
            </label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="admin@enterprise.com"
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} 
            />
          </div>

          {/* Password Group */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: '#94a3b8' }}>
              Secure Account Password
            </label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="••••••••"
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} 
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            style={{ width: '100%', padding: '10px 0', backgroundColor: '#4f46e5', color: '#ffffff', fontWeight: '600', fontSize: '14px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '8px', boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)' }}
          >
            Authorize and Synchronize
          </button>

        </form>
      </div>
    </div>
  );
}