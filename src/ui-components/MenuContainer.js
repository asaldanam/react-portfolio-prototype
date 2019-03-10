import React from 'react';
import css from '../styles/c-menu-container.module.scss';
import ScrollLock from 'react-scrolllock';

const MenuContainer = ({isOpen, children}) => {

  const cx = {
    overlay: `${css.overlay} ${isOpen ? css.overlay_open : ''}`
  }

  const getBackdropWidth = isOpen
    ? (window.innerHeight / 16) + 10
    : 1;

  return (
    <div className={css.menu}>
      <div className={cx.overlay}></div>
      <div className={css.backdrop} style={{transform: `scale(${getBackdropWidth})`}}></div>
      {isOpen ?
        <div className={css.container}>
          <div>
            <ScrollLock/>
            {children}
          </div>
        </div>
      : null}
    </div>
  )
}
 
export default React.memo(MenuContainer);