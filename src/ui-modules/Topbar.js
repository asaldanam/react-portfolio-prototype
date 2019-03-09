import React, { PureComponent } from 'react';
import css from '../styles/c-topbar.module.scss';
import { connect } from 'react-redux';
import { menuStateChange } from '../redux';
import ic24SecBack from '../assets/icons/ic-24-sec-back.svg';
import logo from '../assets/images/logo.svg';
import { MenuButton, IconButton, MenuContainer } from '../lib-components';
import * as Scroll from 'react-scroll';

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
      isHidden: false,
      isFixed: false
    }
  }

  componentDidMount(){
    this.prev = window.scrollY;
    window.addEventListener('scroll', e => this.handleScrollEvent(e), false);

    Scroll.Events.scrollEvent.register('begin', () => {
      console.log("begin");
    });

    Scroll.Events.scrollEvent.register('end', function(to, element) {
      console.log("end", arguments);
    });

    Scroll.scrollSpy.update();
  }

  componentWillMount() {
    window.removeEventListener('scroll',  e => this.handleScrollEvent(e), false)
  }

  render() {
    return (
    <div className={css.wrapper}>
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
              onClick={() => this.toogleMenu(this.props.menuOpen)}
            />
            <MenuContainer isOpen={this.props.menuOpen}>
              {Array(100).fill('cosa').map((item, index) => <div key={index}>{item}</div>)}
            </MenuContainer>
          </div>
        </div>
    </div>
    )
  }

  toogleMenu(isOpen) {
    if (!isOpen) {
      this.props.menuStateChange({menuOpen: true, scrollPosition: window.scrollY});
      // document.body.style.position = 'fixed'
    } else {
      this.props.menuStateChange({menuOpen: false});
      this.prev = this.props.scrollPosition;
      setTimeout(() => {window.scrollTo(0, this.props.scrollPosition)})
      // document.body.style.position = 'static';
    }
  }

  handleScrollEvent(e) {
    const window = e.currentTarget;
    const topbarConfig = () => {
      if (this.prev > window.scrollY) {
        if (window.scrollY <= 0) { return ({isFixed: false, isHidden: false}) }
        else { return ({isFixed: true, isHidden: false}) }
      }
      else if (this.prev < window.scrollY) {
        if (window.scrollY > 150) { return ({isFixed: true, isHidden: true}) }
        else if (window.scrollY <= 0) { return ({isFixed: false, isHidden: false}) }
        else { return ({isFixed: true, isHidden: this.state.isHidden}) }
      }
    }
    this.setState(() => topbarConfig());
    this.prev = window.scrollY;
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
}

export default connect(mapState, mapDispatch)(Topbar);