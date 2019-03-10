import React, { PureComponent } from 'react';
import { MenuButton, IconButton, MenuContainer, UserProfile, MenuItem, Box, Container } from '../lib-components';
import css from '../styles/c-topbar.module.scss';
import { connect } from 'react-redux';
import { menuStateChange } from '../redux';

import ic24SecBack from '../assets/icons/ic-24-sec-back.svg';
import logo from '../assets/images/logo.svg';
import ic40MainAssist from '../assets/icons/ic-40-main-assist.svg';
import ic40MainLocation from '../assets/icons/ic-40-main-location.svg';
import ic40MainPig from '../assets/icons/ic-40-main-pig.svg';

const mapState = state => ({ 
  menuOpen: state.menuOpen,
  userName: state.user.userName,
  userSurname: state.user.userSurname,
  userAccountType: state.user.userAccountType,
  userAvatar: state.user.userAvatar
 });

const mapDispatch = dispatch => ({
  menuStateChange: menuOpen => dispatch( menuStateChange(menuOpen) ),
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
    console.log('Topbar', this.state)
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
              onClick={() => this.props.menuStateChange(!this.props.menuOpen)}
            >
              <MenuButton isOpen={this.props.menuOpen}/>
            </div>
            <MenuContainer isOpen={this.props.menuOpen}>
              <Container animType={'in-out'} animDelay={300}>
                <UserProfile
                  avatarSrc={this.props.userAvatar} 
                  nameTxt={this.props.userName}
                  surnameTxt={this.props.userSurname}
                  userAltTxt={this.props.userAccountType}
                />
              </Container>
              <Box pt={'2rem'}>
                <div onClick={() => {console.log('test')}}>
                  <Container animType={'in-out'} animDelay={300}>
                    <MenuItem iconSrc={ic40MainLocation} itemTxt={'Cajeros cerca'} />
                  </Container>
                </div>
                <div onClick={() => {console.log('test')}}>
                  <Container animType={'in-out'} animDelay={400}>
                    <MenuItem iconSrc={ic40MainAssist} itemTxt={'Asistencia 24 horas'}/>
                  </Container>
                </div>
                <div onClick={() => {console.log('test')}}>
                  <Container animType={'in-out'} animDelay={500}>
                    <MenuItem iconSrc={ic40MainPig} itemTxt={'Producto'}/>
                  </Container>
                </div>
              </Box>
            </MenuContainer>
          </div>
        </div>
    </div>
    )
  }
}

export default connect(mapState, mapDispatch)(Topbar);