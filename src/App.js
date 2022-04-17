import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';
import Create from './pages/create/Create';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import './App.css'
import { useAuthContext } from './hooks/useAuthContext';
import Online from './components/Online';

function App() {
  const { user, authIsReady } = useAuthContext()
  return (
    <div className="App">
      {authIsReady &&
        <BrowserRouter>
          {user && <Sidebar />}
          <div className='container'>
            <Navbar />
            <Routes>
              <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
              <Route path="/create" element={user ? <Create /> : <Navigate to="/login" />} />
              <Route path="/project/:id" element={user ? <Project /> : <Navigate to="/login" />} />
            </Routes>
          </div>
          {user && <Online />}
        </BrowserRouter>
      }
    </div>
  );
}

export default App
