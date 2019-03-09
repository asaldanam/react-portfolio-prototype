import React from 'react';
import css from '../styles/c-icon-button.module.scss';

const IconButton = (props) => (
  <button className={`${css.button} ${props.className}`} type="button" >
    <img src={props.src} onClick={props.onClick} alt={props.alt}/>
  </button>
);
 
export default IconButton;