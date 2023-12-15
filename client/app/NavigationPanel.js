import React,{ useState, useEffect } from 'react';
import ListMessage from '../message/ListMessage';
import Profile from './Profile';
import SearchBar from './SearchBar';
import { BsHouse } from 'react-icons/bs';
import { BsPerson } from 'react-icons/bs';
import {RiZzzFill} from 'react-icons/ri';
import Api from '../api';
import './NavigationPanel.css';

function NavigationPanel (props) {
    const [page, setPage] = useState("home_page");
    const [user, setUser] = useState();
    const [userOther, setUserOther] = useState();
    
    
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const res = await Api.get(`/api/user/${props.user}?userId=${props.user}`);
            setUser(res.data.pseudo);
          } catch (error) {
            console.log(error);
          }
        };
        if (props.user) {
            fetchUser();
          }
        }, [props.user]);

      
    
    const setHomePage =() => {
        setPage("home_page")
      }
    
    const setProfilePage =() => {
      setPage("profile_page")
    }

    const setProfilePageOther = async (id) => {
      await setUserOther(id);
      setPage("profile_page_other")
    }

    const handleLogout = () => {
        props.logout();
      };
    

    return(
        <nav id="navigation_pan">
        <div className='side'>
            <div className="search_bar">
                <SearchBar/>
            </div>
            <div className='sidebar'>
                <button onClick={setHomePage}> <BsHouse className="icon"/>Accueil</button>
                <button onClick={setProfilePage}><BsPerson className='icon'/>Profil</button>
                <button onClick={handleLogout}><RiZzzFill className='icon'/>Déconnexion</button>
            </div>
        </div>
        <div className='mur'>
            {user && page==="home_page" &&
                <ListMessage user={user} userId={props.user} setProfilePageOther={setProfilePageOther}/>
            }
            {user && page==="profile_page" &&
                <Profile userConnected={props.user} userWanted={props.user}/>

            }
            {user && page==="profile_page_other" &&
                <Profile userConnected={props.user} userWanted={userOther}/>

            }
        </div>
        </nav>
    )
}
export default NavigationPanel;