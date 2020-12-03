import React from 'react';
import Classes from './button.module.css';
const button = (props)=>(
<button 
className={[Classes.Button, Classes[props.btnType]].join(' ')}
onClick={props.clicked}
disabled={props.disabled}>
    {props.children}
    </button>
    
    )

    export default button;