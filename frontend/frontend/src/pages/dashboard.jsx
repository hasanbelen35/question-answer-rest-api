import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      axios.get('http://localhost:5000/api/auth/logout', { withCredentials: true });
      console.log("Logout başarılı");
      localStorage.removeItem('authToken'); // Token'ı temizle
      sessionStorage.removeItem('authToken'); // Eğer sessionStorage kullanıyorsanız
      document.cookie = "token=; Max-Age=0; path=/"; // Çerezi temizle
  
      navigate('/');
    } catch (err) {
      console.error('Logout işlemi sırasında hata oluştu:', err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="p-8 bg-black rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-amber-400 text-4xl mb-8">Dashboard</h2>
        <button 
          onClick={handleLogout} 
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
