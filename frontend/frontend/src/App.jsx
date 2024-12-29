import { useNavigate } from 'react-router-dom';
import Router from './Routes/Router';
import Home from './pages/Home/Home';

function App() {
  const navigate = useNavigate();

  return (
    <>

    {/* HOME PAGE*/ }
    <Home />

      

      <Router /> 
    </>
  );
}

export default App;
