import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./App.css"
// Sayfa bileşenleri
import Register from './pages/register';
import Login from "./pages/login";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Welcome to the App</h1>
        <nav>
          <ul>
            <li><Link to="/register"><button>Register</button></Link></li>
            <li><Link to="/login"><button>Login</button></Link></li>
          </ul>
        </nav>

        <Routes>
          {/* React Router v6'da component yerine element kullanılır */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
