import React, { useState, useEffect } from 'react';
import FormulaireMsg from './FormulaireMsg';
import Message from './Message';
import Api from '../api';

function ListMessage(props) {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(props.user)
  const [messageContents, setMessageContents] = useState([]);
  const [messageId, setMessageId] = useState([]);
  const [messagePosters, setMessagePosters] = useState([]);
  const [messagePostersID, setMessagePostersID] = useState([]);
  const [messageDates, setMessageDates] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await Api.get('/api/post');
      //console.log("message"+JSON.stringify(response.data));
      setMessages(response.data);
      setMessageContents(response.data.map((message) => message.message));
      setMessagePosters(response.data.map((message) => message.userPseudo));
      setMessagePostersID(response.data.map((message) => message.userId));
      setMessageDates(response.data.map((message) => message.createdAt));
      setMessageId(response.data.map((message) => message._id));

    };
    fetchPosts();
  }, []);

  const handleMessageSubmit = (message) => {
    const fetchPosts = async () => {
      const response = await Api.get('/api/post');
      //console.log("message : "+JSON.stringify(response.data));
      setMessages(response.data);
      setMessageContents(response.data.map((message) => message.message));
      setMessagePosters(response.data.map((message) => message.userPseudo));
      setMessagePostersID(response.data.map((message) => message.userId));
      setMessageDates(response.data.map((message) => message.createdAt));
      setMessageId(response.data.map((message) => message._id));

    };
    fetchPosts();       
  };

  const setProfile = (id) =>{
    props.setProfilePageOther(id);
  }


  return (
    <div className="listMessage">
      <FormulaireMsg onMessageSubmit={handleMessageSubmit} user={user} userId={props.userId}/>
      {messages.map((message, index) => (
        <div className='message-containerrrrr'>
          <Message 
            message={messageContents[index]} 
            poster={messagePosters[index]}
            posterId={messagePostersID[index]} 
            createdAt={messageDates[index]}
            messageId={messageId[index]}
            onHandleSubmit={handleMessageSubmit}
            key={index} 
            user={user}
            setProfilePageOther={setProfile}
          />
        </div>
      ))}
    </div>
  );
}

export default ListMessage;
