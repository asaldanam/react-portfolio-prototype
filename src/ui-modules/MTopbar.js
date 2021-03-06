import React, { PureComponent } from 'react';
import { MenuButton, IconButton, MenuContainer, UserProfile, MenuItem, Box, Container } from '../lib-components';
import css from '../ui-styles/c-topbar.module.scss';
import { connect } from 'react-redux';
import { menuStateChange } from '../redux';

import ic24SecBack from '../ui-assets/icons/ic-24-sec-back.svg';
import logo from '../ui-assets/images/logo.svg';
import ic40MainAssist from '../ui-assets/icons/ic-40-main-assist.svg';
import ic40MainLocation from '../ui-assets/icons/ic-40-main-location.svg';
import ic40MainPig from '../ui-assets/icons/ic-40-main-pig.svg';
import ic40MainExit from '../ui-assets/icons/ic-40-main-exit.svg';

const mapStateToProps = state => ({ 
  menuOpen: state.menuOpen,
  userName: state.user.userName,
  userSurname: state.user.userSurname,
  userAccountType: state.user.userAccountType,
  userAvatar: state.user.userAvatar
 });

const mapDispatchToProps = dispatch => ({
  menuStateChange: menuOpen => dispatch( menuStateChange(menuOpen) ),
});

export class MTopbar extends PureComponent {

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

    return (
    <div className={css.wrapper}>
      <div className={this.getTopbarCss()}>
          <div className={css.topbar}>
            <div className={this.getIconCss().backIcon} onClick={this.props.onClickBack.bind(this)}>
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
                <div onClick={() => this.props.navigateTo('/cash-machines')}>
                  <Container animType={'in-out'} animDelay={300}>
                    <MenuItem iconSrc={ic40MainLocation} itemTxt={'Cajeros cerca'} />
                  </Container>
                </div>
                <div onClick={() => this.props.navigateTo('/assist')}>
                  <Container animType={'in-out'} animDelay={400}>
                    <MenuItem iconSrc={ic40MainAssist} itemTxt={'Asistencia 24 horas'}/>
                  </Container>
                </div>
                <div onClick={() => this.props.navigateTo('/products')}>
                  <Container animType={'in-out'} animDelay={500}>
                    <MenuItem iconSrc={ic40MainPig} itemTxt={'Producto'}/>
                  </Container>
                </div>
                <div onClick={() => this.props.navigateTo('/')}>
                  <Container animType={'in-out'} animDelay={500}>
                    <MenuItem iconSrc={ic40MainExit} itemTxt={'Cerrar sesión'}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(MTopbar);