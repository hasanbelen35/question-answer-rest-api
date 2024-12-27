import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password }, { withCredentials: true });
      console.log('Login successful:', response.data);

      // Giriş başarılıysa kullanıcıyı ana sayfaya yönlendir
      navigate('/dashboard'); 
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
    }
  };

  return (
    <>
      <div className="login" className="flex flex-col items-center justify-center border ">
      <h2 className='text-amber-400 text-4xl mt-14'> Login</h2>

        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-8'>

          <label className='flex flex-col items-center justify-center'>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email"
            />
          </label>

          <label className='flex flex-col items-center justify-center'>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password"
            />
          </label>

          <button type="submit" className="bg-blue-500 ">Login</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </>

  );
};

export default Login;
