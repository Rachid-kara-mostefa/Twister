import React,{ useState } from 'react';
import './Signup.css';
import Api from '../api';


function Signup(props) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [mail, setMail]=useState('');
  const [passOK, setPassOK] = useState(false);
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(null);

  const getLogin = (evt) => {
    setLogin(evt.target.value);
  };
  const getMail = (evt) => {
    setMail(evt.target.value);
  };
  const getPass1 = (evt) => {
    setPass1(evt.target.value);
  };
  const getPass2 = (evt) => {
    setPass2(evt.target.value);
  };

  const handleSignIn = () => {
    props.login();
  };


  const submissionHandler = async (evt) => {
    evt.preventDefault();
    if (pass1 === pass2 && login !== '' && mail !== '') {
      setPassword(pass1);
      setPassOK(true);
      //console.log(login, mail, pass1)
      try {
        const response = await Api.post('/api/user/register', { 
          pseudo : login,
          email : mail,
          password : pass1
        });
        
        setUserCreated(true);
      } catch (error) {
        if (error.response) {
          const errorMessages = Object.values(error.response.data.errors);
          setError(errorMessages);
        } else {
          setError('An error occurred while making the request');
        }
        
      }
      
    }
  };


  const showError = passOK || pass1 !== '' || pass2 !== '';

  return (
    <div className="container">
      <h1>
        Inscription 
      </h1>
      {userCreated ? (
        <>
          <p>Votre compte a été créé avec succès. Cliquez ci-dessous pour retourner sur la page de connexion :</p>
          
            <button onClick={handleSignIn} className='buttons'>Connexion</button>
          
        </>
      ) : (
        <form onSubmit={submissionHandler}>
          <input id="mail" onChange={getMail} placeholder="Adresse mail..." required/>

          <input id="signin_login" onChange={getLogin} placeholder="Nom d'utilisateur..." required/>

          <input type="password" id="signin_mdp1" onChange={getPass1} placeholder="Mot de passe..." required/>

          <input type="password" id="signin_mdp2" onChange={getPass2} placeholder="Confirmez votre mot de passe..." required/>

          {showError && (pass1 !== pass2 ) ? (
            <p style={{ color: 'red' }}>Erreur: mots de passe différents</p>) : null}

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit" className='buttons'>Inscription</button>

          <button type="reset" className='buttons'>Reset</button>

          <button onClick={handleSignIn} className='buttons'> Retour à la page de Connexion</button>

          
        </form>
      )}
    </div>
  );
}

export default Signup;
