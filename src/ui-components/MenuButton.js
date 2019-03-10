import React from 'react'
import css from '../styles/c-menu-button.module.scss';

const MenuButton = (props) => {
  console.log(props);
  const line = {
    top: props.isOpen
      ? {transform: 'scaleX(1) rotate(45deg) translate(5px, 5px)'}
      : {transform: 'scaleX(1) rotate(0deg) translate(0px, 0px)'},
    mid: props.isOpen
      ? {transform: 'scaleX(0) rotate(0deg) translate(0px, 7px)', opacity: '0'}
      : {transform: 'scaleX(0.875) rotate(0deg) translate(-2px, 7px)', opacity: '1'},
    bottom: props.isOpen 
      ? {transform: 'scaleX(1) rotate(-45deg) translate(-5px, 5px)'}
      : {transform: 'scaleX(0.75) rotate(0deg) translate(-4px, 14px)'}
  };
  return (
    <div onClick={props.onClick} className={css.container} >
      <ul className={css.wrapper}>
        <li style={line.top}></li>
        <li style={line.mid}></li>
        <li style={line.bottom}></li>
      </ul>
    </div>
  )
};
 
export default React.memo(MenuButton);