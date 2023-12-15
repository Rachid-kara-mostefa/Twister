import React, { useState } from 'react';
import './FormulaireMsg.css';
import Api from '../api'

function FormulaireMsg(props) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  //const handleSubmit = (event) => {
  //  event.preventDefault();
  //  props.onMessageSubmit(message);
  //  setMessage('');
  //};
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Api.post("/api/post/",{ userId : props.userId ,pseudo : props.user, message: message });
      props.onMessageSubmit(response.data);
      setMessage('');
    } catch (error) {
      let errorMessages;

      errorMessages = error.response && error.response.data && error.response.data.errors ? Object.values(error.response.data.errors) : 'An error occurred while making the request';

      setError(errorMessages);
      console.log(error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="formulaireMsg">
      <textarea
        placeholder="Exprimez-vous en quelques mots..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        maxLength="280"
        required
      />
      <div className="count">{message.length}/280</div>
      <button type="submit">Publier</button>
    </form>
  );
}

export default FormulaireMsg;