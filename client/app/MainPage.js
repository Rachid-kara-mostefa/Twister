
import React,{ useState } from 'react';
import NavigationPanel from './NavigationPanel';
import Login from '../connexion/Login';
import Signup from '../connexion/Signup';
import Profile from './Profile'
import Api from '../api';

function MainPage() {
  const [isConnected, setConnected] = useState(false);
  const [page, setPage] = useState("login_page");
  const [user, setUser] = useState();


  const setLoginPage =() =>{
    setPage("login_page")
  }

  const setSignUpPage =() =>{
    setPage("signup_page")
  }

  const getConnected = () => {
    setConnected(true);
    setPage("navigation_page");
  };

  const handleLogout = async () => {
    await Api.get('/api/user/logout');
    setConnected(false);
    setPage("login_page");
  };

  return (
    <div id="container">
      {page === "login_page" && 
        <Login getConnected={getConnected} signup={setSignUpPage} setUser={setUser}/>
      }
      {page=== "navigation_page" &&  
        <NavigationPanel logout={handleLogout} isConnected={isConnected} user={user}/>
      }
      {page === "signup_page" && 
        <Signup login={setLoginPage}/>
      }

      
    </div>
  );
}

export default MainPage;
