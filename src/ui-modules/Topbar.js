import React, { PureComponent } from 'react';
import css from '../styles/c-topbar.module.scss';
import { connect } from 'react-redux';
import { menuStateChange } from '../redux';
import ic24SecBack from '../assets/icons/ic-24-sec-back.svg';
import logo from '../assets/images/logo.svg';
import { MenuButton, IconButton, MenuContainer, WindowScrollListener } from '../lib-components';

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
      // isHidden: false,
      // isFixed: false,
      scrollingThreshold: 0
    }
  }

  componentDidMount(){
    this.prev = window.scrollY;
    window.addEventListener('scroll', e => this.handleScrollEvent(e), false);
  }

  componentWillMount() {
    window.removeEventListener('scroll',  e => this.handleScrollEvent(e), false)
  }

  handleScrollEvent(e) {
    const window = e.currentTarget;
    // const topbarConfig = () => {
    //   if (this.prev > window.scrollY) {
    //     if (window.scrollY <= 0) { return ({isFixed: false, isHidden: false}) }
    //     else { return ({isFixed: true, isHidden: false}) }
    //   }
    //   else if (this.prev < window.scrollY) {
    //     if (window.scrollY > 150 && this.state.scrollingThreshold > 50) 
    //       { return ({isFixed: true, isHidden: true}) }
    //     else if (window.scrollY <= 0) { return ({isFixed: false, isHidden: false}) }
    //     else { return ({isFixed: true, isHidden: this.state.isHidden}) }
    //   }
    // }

    // this.setState(() => topbarConfig());
    this.setState(() => ({
      direction: this.prev > window.scrollY ? 'up' : 'down',
      positionReached: window.scrollY > 150,
      thresholdReached: this.scrollingThreshold > 50
    }));
    // this.prev > window.scrollY
    // ? this.props.direction('up')
    // : this.props.direction('down')
    
    this.prev = window.scrollY;
      
    // this.setState(() => ({scrollingThreshold: this.state.scrollingThreshold + 1}))

    // window.clearTimeout(this.timer);
    // this.timer = setTimeout(() => { 
    //   this.setState(() => ({scrollingThreshold: 0}))
    // }, 450);

    this.scrollingThreshold = this.scrollingThreshold + 1;
    window.clearTimeout(this.timer);
    this.timer = setTimeout(() => { 
      this.scrollingThreshold = 0;
    }, 450);

  }

  styles() {
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

  render() {
    console.log(this.state);
    return (
    <div className={css.wrapper}>
    {/* <WindowScrollListener direction={e => {this.setState(() => ({direction: e}))}} /> */}
      <div className={
            this.state.isFixed 
              ? this.state.isHidden ? css.containerHidden : css.containerFixed
              : css.container
          }>
          <div className={css.topbar}>
            <IconButton src={ic24SecBack} className={`${this.styles().backIcon} ${css.iconLeft}`}/>
            <img className={this.styles().logo} src={logo} alt=""/>
            <MenuButton 
              className={`${this.styles().menuIcon} ${css.iconRight}`}
              isOpen={this.props.menuOpen}
              onClick={() => this.props.menuStateChange({menuOpen: !this.props.menuOpen})}
            />
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