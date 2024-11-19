import './App.css';
import './assets/styles/style.css'
import Posts from './components/Posts';
import { AuthContext } from './contexts/AuthProvider';
import React, {useContext} from 'react';
import icon from './assets/images/icon.png'

function App() {
  const {username, logout} = useContext(AuthContext);
  return ( <>
    
    <header className='header'>
      <h1>Lixowitter</h1>
      {username ? (
        <div>
          <a className="icon" href={`profile/${username}`} >
          <img src={icon} alt="" /></a> 
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <>
        <a href='/login'>Login</a>
        <a href='/register'>Register</a>
        </>
      )}
    </header>
    <div>
      <Posts />
    </div>
  </>
  );
}

export default App;
