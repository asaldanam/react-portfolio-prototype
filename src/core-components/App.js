import React, { Component, Fragment } from 'react';
import '../ui-styles/App.scss';
import AppRouter from './AppRouter';

class App extends Component {
  render() {
    return (
      <Fragment>
        <AppRouter/>
      </Fragment>
    );
  }
}

export default App
