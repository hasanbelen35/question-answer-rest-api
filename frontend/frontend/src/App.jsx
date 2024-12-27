import { useNavigate } from 'react-router-dom';
import Router from './Routes/Router';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className="App" className='flex justify-center items-center'  >
        <h1>Welcome to the App</h1>
        <nav>
          <ul>
            {/* Butonlara tıklanınca navigate ile yönlendirme yapılır */}
            <li>
              <button className='bg-red-500' onClick={() => navigate('/register')}>Register</button>
            </li>
            <li>
              <button onClick={() => navigate('/login')}>Login</button>
            </li>
          </ul>
        </nav>
      </div>

      <Router /> {/* Router burada kullanılıyor */}
    </>
  );
}

export default App;
