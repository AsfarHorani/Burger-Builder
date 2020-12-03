import React from 'react';
import Classes from './navigationItem.module.css';
import {NavLink} from 'react-router-dom'

const navigationItem=(props)=>(
    <ul>
                <li 
                    className={Classes.NavigationItem}
                    >
                    <NavLink
                    activeClassName={Classes.active}
                    to={props.link}
                    exact = {props.exact}
                    >
                        {props.children}
                    </NavLink>
                </li>

    </ul>
); 



export default navigationItem;