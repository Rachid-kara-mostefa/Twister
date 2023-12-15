import React, { useState, useEffect } from 'react';
//import Message from '../message/Message';
import Api from '../api';

function Profile(props) {
  const [bio,setBio]=useState("");
  const [pseudo,setPseudo]=useState("");
  const [following,setFollowing]=useState([]);
  const [likes,setLikes]=useState([]);
  const [followers,setFollowers]=useState([]);
  const [email,setEmail]=useState("");
  const [posts,setPosts]=useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await Api.get(`/api/user/${props.userWanted}?userId=${props.userWanted}`);
        setPseudo(res.data.pseudo);
        res.data.bio && setBio("bio");
        setEmail(res.data.email);
        setFollowing(res.data.following);
        setLikes(res.data.likes);
        setFollowers(res.data.followers);
        await setPosts(res.data.myPosts);
        console.log(JSON.stringify(res.data));
        
        
      } catch (error) {
        console.log(error);
      }
    };
    if (props.userWanted) {
        fetchUser();
      }
    }, [props.user]);





  const handleChangeBio = (event) => {
    setBio(event.target.value);
  };

  const handleSubmitBio = async (event) => {
    event.preventDefault();
    try {
      await Api.put(`/api/user/${props.userConnected}/bio`, { bio }); // envoyer la bio modifiée à l'API
      alert('Bio modifiée avec succès !');
    } catch (error) {
      console.log(error);
      alert('Erreur lors de la modification de la bio.');
    }
  };






  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-info">
          <h2>{"Bienvenue sur le profil de @"+pseudo+ "!"}</h2>
          <h3>{email}</h3>
          {props.userConnected === props.userWanted ? (
            <form onSubmit={handleSubmitBio}>
              <textarea value={bio} onChange={handleChangeBio}></textarea>
              <button type="submit">Modifier</button>
            </form>
          ) : (
            <p>{bio}</p>
          )}
          {props.userWanted!==props.userConnected && <button >Follow</button>}
          <p>{followers.length} followers - {following.length} following</p>
        </div>
      </div>
      <div className="profile-messages">
        <h3>Mes messages</h3>
        {/*posts.map((postId, index) => (
          
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
        ))*/}
      {posts.length === 0 && (
      <p>Cet utilisateur n'a pas encore publié de post.</p>
      )}

      </div>
    </div>
  );
}

export default Profile;
