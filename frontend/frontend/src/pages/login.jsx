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

  const handleRegisterRedirect = (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engeller
    navigate('/register'); // Yönlendirme yapılır
  };

  return (
    <>
      <div className="login-container flex items-center justify-center h-screen bg-gray-900">
        <div className="login-box p-8 bg-black rounded-lg shadow-lg w-96">
          <h2 className="text-amber-400 text-4xl mb-8 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="input-group flex flex-col">
              <label className="text-white">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field p-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none"
              />
            </div>
            <div className="input-group flex flex-col">
              <label className="text-white">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field p-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none"
              />
            </div>
            <button type="submit" className="submit-btn bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Login
            </button>
          </form>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <div id="to-Register" className="flex flex-col justify-center items-center">
            <p>Do you have an account?</p>
            <br />
            <a href="#" onClick={handleRegisterRedirect} className="text-blue-400">Click Here <span className='text-white'>to Register</span></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
