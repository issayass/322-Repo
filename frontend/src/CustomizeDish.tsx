import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'

interface CustomizeDishProps {

}

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