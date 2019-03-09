import React from 'react'
import css from '../styles/c-menu-button.module.scss';

const MenuButton = ({ isOpen, onClick, className }) => {

  const line = {
    top: isOpen
      ? {transform: 'scaleX(1) rotate(45deg) translate(5px, 5px)'}
      : {transform: 'scaleX(1) rotate(0deg) translate(0px, 0px)'},
    mid: isOpen
      ? {transform: 'scaleX(0) rotate(0deg) translate(0px, 7px)', opacity: '0'}
      : {transform: 'scaleX(0.875) rotate(0deg) translate(-2px, 7px)', opacity: '1'},
    bottom: isOpen 
      ? {transform: 'scaleX(1) rotate(-45deg) translate(-5px, 5px)'}
      : {transform: 'scaleX(0.75) rotate(0deg) translate(-4px, 14px)'}
  };

  return (
    <div onClick={onClick} className={`${css.container} ${className}`} >
      <ul className={css.wrapper}>
        <li style={line.top}></li>
        <li style={line.mid}></li>
        <li style={line.bottom}></li>
      </ul>
    </div>
  )
};
 
export default React.memo(MenuButton);