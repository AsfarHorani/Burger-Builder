import React from 'react';
import classes from './input.module.css';

const input = (props)=>{

    let inputElement = null;
    let inputClasses = [classes.inputElement]

    if(props.invalid && props.shouldValidate && props.touched)
    {
        inputClasses.push(classes.Invalid)
    }

    switch(props.elementType)
    {
        case('input'):
        inputElement=<input  
         className={inputClasses.join(' ')} 
         {...props.elementConfig} 
         value={props.value}
          onChange={props.changed}/>;
        break;
        case('textArea'):
        inputElement=<textarea  className={inputClasses.join(' ')} {...props.elementConfig}value={props.value} onChange={props.changed}/>;
        break;

        case('select'):
        inputElement=(<select
          className={classes.Select} 
          onChange={props.changed}
          value={props.value}>
              {props.elementConfig.options.map(opt=>{
                  return (
                  <option key={opt.value}value= {opt.value} onChange={props.changed}>{opt.displayValue}</option>
                  )
              })}
          </select>);
        break;

        default:
            inputElement= <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
            break;

    }

    
let validationError = null;
if (props.invalid && props.touched) {
    validationError = <p>*Please enter a valid value!</p>;
}


    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.lable}</label>
            {inputElement}
            {validationError}
        </div>
    )
}


export default input;

