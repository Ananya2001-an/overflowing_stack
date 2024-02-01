import { useState, useEffect } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if(isLoggedIn) 
      navigate("/")
    else 
      navigate("/login")
  }, [isLoggedIn])

  const handleLogin = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
  };

  return (
    <>
      <Routes>
          <Route path="*" element={<Home onLogout={handleLogout}/>} />
          <Route path="/login" element={<Login onLogin={handleLogin}/>} />
          <Route path="/signup" element={<Signup/>} />
      </Routes>
    </>
  )
}

export default App
