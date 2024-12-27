import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // GET isteği ile logout işlemi
      axios.get('http://localhost:5000/api/auth/logout', { withCredentials: true });
      console.log("logout basarlı")
      // Başarılı logout sonrası anasayfaya yönlendirme
      navigate('/');
    } catch (err) {
      console.error('Logout işlemi sırasında hata oluştu:', err.message);
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
