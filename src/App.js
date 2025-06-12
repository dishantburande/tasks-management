
import './App.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import { useState } from 'react';
import RefrshHandler from './RefreshHandler.js';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  const PrivateRoute =({ element})=>{
   return isAuthenticated ? element : <Navigate to={'/login'}/>
  }
  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
       <Route path='/' element={<Navigate to='/login'/>}/>
       <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<PrivateRoute  element={<Home/>}/>}/>
      </Routes>
    </div>
  );
}

export default App;
