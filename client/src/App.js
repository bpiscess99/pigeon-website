import { Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Createclub from './pages/Createclub';
import Clubdetail from './pages/Clubdetail';
import Pigeonowner from './pages/Pigeonowner';
import Tournament from './pages/Tournament';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={< Dashboard />}/>
        <Route path='/login' element={< Login />}/>
        <Route path='/create' element={< Createclub />}/>
        <Route path='/clubdetail/:slug' element={< Clubdetail />}/>
        <Route path='/pigeonowner' element={< Pigeonowner />}/>
        <Route path='/Tournament' element={< Tournament />}/>
      
      </Routes>


    </>
  );
}

export default App;
