import React, { PureComponent } from 'react';
import css from '../styles/c-topbar.module.scss';
import { connect } from 'react-redux';
import { menuStateChange } from '../redux';
import ic24SecBack from '../assets/icons/ic-24-sec-back.svg';
import logo from '../assets/images/logo.svg';
import { MenuButton, IconButton, MenuContainer } from '../lib-components';

const mapState = state => ({ 
  menuOpen: state.menuOpen,
  scrollPosition: state.scrollPosition
 });

const mapDispatch = dispatch => ({
  menuStateChange: menuState => dispatch( menuStateChange(menuState) ),
});

export class Topbar extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      direction: 'up',
      top: true,
      positionReached: false,
      thresholdReached: false
    }
  }

  scrollingThreshold = 0;

  componentDidMount(){
    this.prev = window.scrollY;
    window.addEventListener('scroll', e => this.handleScrollEvent(e), false);
  }

  componentWillMount() {
    window.removeEventListener('scroll',  e => this.handleScrollEvent(e), false)
  }

  calcThreshold() {
    this.scrollingThreshold = this.scrollingThreshold + 1;
    window.clearTimeout(this.timer);
    this.timer = setTimeout(() => { 
      this.scrollingThreshold = 0;
    }, 450);
  }

  handleScrollEvent(e) {
    const window = e.currentTarget;
    this.setState(() => ({
      direction: this.prev > window.scrollY ? 'up' : 'down',
      top: window.scrollY <= 0,
      positionReached: window.scrollY > 150,
      thresholdReached: this.scrollingThreshold > 30
    }));
    this.calcThreshold();
    this.prev = window.scrollY;
  }

  getIconCss() {
    const defaultStyles = { 
      backIcon: css.iconHidden,
      logo: css.logoMid, 
      menuIcon: css.iconHidden
    }
    switch (this.props.topBarType) {
      case 'login':
        return defaultStyles
      case 'dashboard':
        return {...defaultStyles, logo: css.logoLeft, menuIcon: css.iconShow}
      case 'innerpage':
        return {...defaultStyles, backIcon: css.iconShow, menuIcon: css.iconShow}
      default:
        return defaultStyles;
    }
  }

  getTopbarCss() {
    const isFixed = !this.state.top
    const isHidden = this.state.thresholdReached
      ? this.state.direction === 'down'
        && !this.state.top
        && this.state.positionReached
      : false;
    return [
      css.container,
      isFixed ? css._fixed : '',
      isHidden ? css._hidden : ''
    ].join(' ')
  }

  render() {
    console.log(this.state)
    return (
    <div className={css.wrapper}>
      <div className={this.getTopbarCss()}>
          <div className={css.topbar}>
            <div className={this.getIconCss().backIcon}>
              <IconButton src={ic24SecBack}/>
            </div>
            <img className={this.getIconCss().logo} src={logo} alt=""/>
            <div 
              className={`${this.getIconCss().menuIcon} ${css.iconRight}`}
              onClick={() => this.props.menuStateChange({menuOpen: !this.props.menuOpen})}
            >
              <MenuButton isOpen={this.props.menuOpen}/>
            </div>
            <MenuContainer isOpen={this.props.menuOpen}>
              {Array(100).fill('cosa').map((item, index) => <div key={index}>{item}</div>)}
            </MenuContainer>
          </div>
        </div>
    </div>
    )
  }
}

export default connect(mapState, mapDispatch)(Topbar);