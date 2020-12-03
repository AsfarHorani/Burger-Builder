import React from 'react';
import burgerLogo from '../../assets/Images/burger-logo.png';
import Classes from './logo.module.css';

const logo=(props)=>(
    <div className={Classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="My Burger"
        />
    </div>

);

export default logo; 