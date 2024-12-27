import { Link } from 'react-router-dom';
import Router from './Routes/Router'; // Router bileşeni büyük harfle yazılmalı

function App() {
  return (
    <div className="App">
      <h1>Welcome to the App</h1>
      <nav>
        <ul>
          <li><Link to="/register"><button>Register</button></Link></li>
          <li><Link to="/login"><button>Login</button></Link></li>
        </ul>
      </nav>

      <Router /> {/* Router burada kullanılıyor */}
    </div>
  );
}

export default App;
