import { Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';  // Dizinizi gözden geçirin
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

const Router = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default Router;
