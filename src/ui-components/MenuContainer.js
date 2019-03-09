import React from 'react';
import css from '../styles/c-menu-container.module.scss';
import ScrollLock, { TouchScrollable } from 'react-scrolllock';

const MenuContainer = ({isOpen, children}) => (
  <div className={`${css.container} ${ isOpen ? css._open : ''}`}>
    {isOpen ?
      <div>
        <ScrollLock />
        <TouchScrollable>
          {children}
        </TouchScrollable>
      </div>
    : null}
  </div>
)
 
export default MenuContainer;