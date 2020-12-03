import React from 'react';
import BuildControl from './BuildControl/BuildControl'
import Classes from './buildControls.module.css';

const controls=[
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const buildControls=(props)=>{


    return(
        <div className={Classes.BuildControls}>
            <p> Current price: <strong>{props.price.toFixed(2)}  </strong></p>
            {controls.map((el)=>(
                 <BuildControl 
                    key = {el.label} 
                    label={el.label} 
                    added={()=>props.ingredientAdded(el.type)}
                    remove={()=>props.ingredientRemove(el.type)}
                    disabled={props.disabled[el.type]}
                    />
            ))}
            <button className={Classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>ORDER NOW</button>
        </div>

    );
}

export default buildControls;