import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // useHistory yerine useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // useNavigate kullanıldı

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password }, { withCredentials: true });
      console.log('Login successful:', response.data);
      
      // Giriş başarılıysa kullanıcıyı ana sayfaya yönlendir
      navigate('/dashboard');  // useNavigate kullanılarak yönlendirme yapıldı
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password"
          />
        </label>
        <button type="submit" className="button">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
