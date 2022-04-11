import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

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
            <Switch>
              <Route exact path="/">
                {user && <Dashboard />}
                {!user && <Redirect to="/login" />}
              </Route>
              <Route path="/login">
                {user && <Redirect to="/" />}
                {!user && <Login />}
              </Route>
              <Route path="/signup">
                {user && <Redirect to="/" />}
                {!user && <Signup />}
              </Route>
              <Route path="/create">
                {user && <Create />}
                {!user && <Redirect to="/login" />}
              </Route>
              <Route path="/project/:id">
                {user && <Project />}
                {!user && <Redirect to="/login" />}
              </Route>
            </Switch>
          </div>
          {user && <Online />}
        </BrowserRouter>
      }
    </div>
  );
}

export default App
