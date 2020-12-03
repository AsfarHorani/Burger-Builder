import React from 'react';
import Classes from './navigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'; 
// import {Route, NavLink} from 'react-router-dom';

const navigationItems=(props)=>(
    <ul className={Classes.NavigationItems}>
        <NavigationItem  link='/' exact >Burger Builder</NavigationItem>
        <NavigationItem  link='/orders'>Orders</NavigationItem>

    </ul>
);

export default navigationItems; 