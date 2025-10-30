import { useState } from 'react';
import { api } from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@bookit.com');
  const [password, setPassword] = useState('admin123');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const r = await api.post('/auth/login', { email, password });
      localStorage.setItem('bookit_admin_token', r.data.token);
      navigate('/admin');
    } catch (e: any) {
      setErr(e?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container-max px-4 py-10 max-w-md">
      <h1 className="text-xl font-semibold">Admin Login</h1>
      <div className="mt-4">
        <div className="label mb-1">Email</div>
        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mt-4">
        <div className="label mb-1">Password</div>
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {err && <div className="mt-3 text-sm text-red-600">{err}</div>}
      <button className="btn-black mt-4" onClick={login}>Login</button>
    </div>
  );
}
