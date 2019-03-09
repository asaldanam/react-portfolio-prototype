import React, { Component } from 'react';
import './App.scss';
import Topbar from './ui-modules/Topbar';
import { connect } from 'react-redux';

const mapState = state => ({ 
  menuOpen: state.menuOpen,
  scrollPosition: state.scrollPosition
 });

class App extends Component {

  render() {
    return (
      <div className={'App'}>
          <Topbar topBarType={'innerpage'}/>
          { Array(100)
            .fill('test scroll')
            .map((item, index) => 
              <div key={index} style={{paddingLeft: '16px', backgroundColor: index === 30 ? 'red': 'white'}}>{item}</div>
          )}
      </div>
    );
  }
}

export default connect(mapState)(App)
