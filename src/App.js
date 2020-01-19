import React, {useState, useContext} from 'react';
import Header from './components/Header/Header';
import LandingLayout from './components/LandingLayout/LandingLayout';
import MatcherLayout from './components/MatcherLayout/MatcherLayout';
import {AuthContext} from './firebase/AuthContext';
import './global-styles/global.scss'

function App() {
  const [page, setPage] = useState('home');
  const currentUser = useContext(AuthContext);
  return (
    <div className="App">
      <Header setPage={setPage}/>
      {page === 'home' ? <LandingLayout setPage={setPage}/> : <MatcherLayout/>} 
    </div>
  );
}

export default App;
