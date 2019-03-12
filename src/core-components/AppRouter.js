import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { PDashboard } from '../ui-pages/PDashboard';
import { PNotFound } from '../ui-pages/PNotFound';
import { connect } from 'react-redux'
import MTopbar from '../ui-modules/MTopbar';

const mapStateToProps = (state) => ({
  menuOpen: state.menuOpen
});

export class RouterOutletComponent extends PureComponent {

  getTopbarType(pathname) {
    const mapPathsToTopbarTypes = {
      '/': 'dashboard',
    }
    return mapPathsToTopbarTypes[pathname] || 'innerpage';
  }

  goBack() {
    console.log('test')
   this.props.history.goBack();
  }
  
  render() {
    console.log(this.props.history);
    return (
      <div className={'App'}>
        <MTopbar 
          topBarType={this.props.menuOpen ? 'dashboard' : this.getTopbarType(this.props.history.location.pathname)}
          onClickBack={() => {this.goBack()}}
        />
        <div className={`AppWrapper ${this.props.menuOpen ? 'AppWrapper_hidden' : 'AppWrapper_show'}`}>
          <TransitionGroup className={`AppRouterAnim AppRouterAnim_${this.props.history.action.toLowerCase()}`}>
            <CSSTransition key={this.props.location.key} timeout={{ enter: 300, exit: 300 }} classNames={'fade'}>
              <Switch location={this.props.location}>
                <Route path="/" exact component={PDashboard} />
                <Route component={PNotFound} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>

      </div>
    );
  }
};

const RouterOutlet = withRouter(connect(mapStateToProps)(RouterOutletComponent));

const AppRouter = () => {
  return (
    <Router>
      <RouterOutlet></RouterOutlet>
    </Router>
  )
}

export default AppRouter;
