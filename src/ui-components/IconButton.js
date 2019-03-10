import React from 'react';
import css from '../styles/c-icon-button.module.scss';

const IconButton = (props) => {
  console.log(props)
  return (
    <button className={css.button} type="button" >
      <img src={props.src} onClick={props.onClick} alt={props.alt}/>
    </button>
  )
};
 
export default React.memo(IconButton);