import React from 'react';
import './Message.css';
import { TbMessageDots } from 'react-icons/tb';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { BsPencil } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Api from '../api';


function Message(props) {
  //console.log("msgauthor : "+props.message.author);
  //console.log("msguser : "+props.user);

const handleDelete=async  () =>{
  console.log(props.messageId);
  const res= await Api.delete('/api/post/delete_post', {postId : props.messageId});
  console.log(JSON.stringify(res));
  props.onHandleSubmit();
}

const handleProfile=()=>{
  console.log("dazdzadz")
  props.setProfilePageOther(props.posterId);
}

  return (
    <div className="message-container" >
      <div className="author">{"@"+props.poster}</div>
      <p className='content'>{props.message}</p>
      <p className='date'>{new Date(props.createdAt).toLocaleDateString()}</p>      
      {props.poster === props.user &&
      <div className='button-container'>
            <button className='reponse_button'> <TbMessageDots/></button>
            <button className='like_button'> <AiOutlineHeart/></button>
            <button className='profile_button' onClick={handleProfile}> <BsPerson/></button>
            <button className='edit_button'> <BsPencil/></button>
            <button className='delete_button' /*onClick={handleDelete}*/> <RiDeleteBin6Line/></button>

        </div>
      }
      {props.poster !== props.user &&
      <div className='button-container'>
            <button className='reponse_button'> <TbMessageDots/></button>
            <button className='like_button'> <AiOutlineHeart/></button>
            <button className='profile_button' onClick={handleProfile}> <BsPerson/></button>
            

        </div>
      }
      

    </div>
  );
}

export default Message;
