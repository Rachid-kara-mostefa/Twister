import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import MainPage from './app/MainPage';
import {FaFeatherAlt} from 'react-icons/fa';


const root = createRoot(document.getElementById('root'));
root.render(
  <div className='index'>
    <svg className="background" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
      <path fill="#a2d9ff" fillOpacity="1" d="M0,96L34.3,101.3C68.6,107,137,117,206,133.3C274.3,149,343,171,411,192C480,213,549,235,617,229.3C685.7,224,754,192,823,154.7C891.4,117,960,75,1029,80C1097.1,85,1166,139,1234,160C1302.9,181,1371,171,1406,165.3L1440,160L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
    </svg>
    <header className='headindex'>
      <p className='titre'><FaFeatherAlt className='icon'/>Twister</p>
    </header>
    <React.StrictMode>
      <MainPage />
    </React.StrictMode>
  </div>
);

reportWebVitals();