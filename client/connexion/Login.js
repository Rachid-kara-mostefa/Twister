import React,{ useState } from 'react';
import './Login.css';
import Api from '../api';



function Login(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const getLogin = (evt) => {setLogin(evt.target.value)}
  const getPassword = (evt) => {setPassword(evt.target.value)}

  const [error, setError] = useState(null);

  const handleLogin = async (evt) => {
    evt.preventDefault();

    try {
      const response= await Api.post('/api/user/login',{
        email : login,
        password : password
      });
      //console.log("login response : " + response.data.user);


      await props.setUser(response.data.user);
      props.getConnected(); // Appelle la fonction login() dans MainPage pour mettre à jour le state isConnected
    } catch (error) {
      if (error.response) {
        const errorMessages = Object.values(error.response.data.errors);
        setError(errorMessages);
      } else {
        setError('An error occurred while making the request');
      }
      
    }
  };

  return (
    <>
      <div className='container'>
        
        <h1>Connexion</h1>
      
      <form onSubmit={handleLogin}>
        
        <input id="login" onChange={getLogin} placeholder="Adresse mail..." required/>

        
        <input type="password" id="mdp" onChange={getPassword} placeholder="Mot de passe..." required/>

        {error && <p style={{ color: 'red' }}>{error}</p>}


        <button type="submit" className='buttons'>
          Connexion
        </button>


      </form>

      <p>Vous n'avez pas de compte?&nbsp;</p>

      <button onClick={props.signup} className='buttons'>
          Inscrivez-vous maintenant !
      </button>

      </div>
    </>
  );
}

export default Login;
