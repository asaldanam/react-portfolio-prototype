import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { PDashboard } from '../ui-pages/PDashboard';
import { PNotFound } from '../ui-pages/PNotFound';
import { connect } from 'react-redux'
import MTopbar from '../ui-modules/MTopbar';
import PLogin from '../ui-pages/PLogin';
import { menuStateChange } from '../redux';

const mapStateToProps = (state) => ({
  menuOpen: state.menuOpen
});

const mapDispatchToProps = dispatch => ({
  menuStateChange: menuOpen => dispatch( menuStateChange(menuOpen) ),
});

export class RouterOutletComponent extends PureComponent {

  getTopbarType(pathname) {
    const mapPathsToTopbarTypes = {
      '/': 'login',
      '/dashboard': 'dashboard'
    }
    return mapPathsToTopbarTypes[pathname] || 'innerpage';
  }

  goBack() {
   this.props.history.goBack();
  }
  
  navigateTo(path) {
    this.props.history.push(path)
    this.props.menuStateChange(false);
  }
  
  render() {
    return (
      <div className={'App'}>
        <MTopbar 
          topBarType={this.props.menuOpen ? 'dashboard' : this.getTopbarType(this.props.history.location.pathname)}
          onClickBack={() => {this.goBack()}}
          navigateTo={path => this.navigateTo(path)}
        />
        <div className={`AppWrapper ${this.props.menuOpen ? 'AppWrapper_hidden' : 'AppWrapper_show'}`}>
          <TransitionGroup className={`AppRouterAnim AppRouterAnim_${this.props.history.action.toLowerCase()}`}>
            <CSSTransition key={this.props.location.key} timeout={{ enter: 300, exit: 300 }} classNames={'fade'}>
              <Switch location={this.props.location}>
                <Route path="/" exact component={PLogin} />
                <Route path="/dashboard" exact component={PDashboard} />
                <Route component={PNotFound} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>

      </div>
    );
  }
};

const RouterOutlet = withRouter(connect(mapStateToProps, mapDispatchToProps)(RouterOutletComponent));

const AppRouter = () => {
  return (
    <Router>
      <RouterOutlet></RouterOutlet>
    </Router>
  )
}

export default AppRouter;
