import React from 'react';

import onlineIcon from '../images/onlineIcon.png';

import '../styles/text-container-style.css';

const TextContainer = ({ users }) => (
  <div className="activeBackground">
    {
      users
        ? (

            <div className="activeContainer">
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                  <img alt="Online Icon" src={onlineIcon}/>
                    {name}
                    
                  </div>
                ))}
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;