import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/style.css'

const CustomizeDish: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div id='wrapper'>
        <button id='return-button' onClick={() => navigate('/Menu')}>Log in / Sign up</button>
        <div id="component">
            
        </div>
      </div>
    );
};

export default CustomizeDish;