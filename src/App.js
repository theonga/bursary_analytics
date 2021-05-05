import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import MainApp from './pages/app';
import Login from './pages/auth';
import useData from './hooks/useData';

function App() {
  const { adminData, setAdminData } = useData();
  if(!adminData) return(
    <Login setAdminData={setAdminData}/>
  )

  return (
    <Switch>
      <Route path="/" component={MainApp}  exact/>
    </Switch>
  );
}

export default App;
