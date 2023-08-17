import React from "react";
import classes from "./Input.module.css";
/* As this is a custom component, we are using forward refs, by wrapping our entire Input 
component in React.forwardRef()*/
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input}></input>
    </div>
  );
});

export default Input;
