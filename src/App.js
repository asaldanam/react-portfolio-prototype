import React, { Component } from 'react';
import './App.scss';
import Topbar from './ui-modules/Topbar';
import { connect } from 'react-redux';
import { Chart } from './lib-components';

const mapState = state => ({ 
  menuOpen: state.menuOpen
 });

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      dataSource: []
    }
  }


  componentDidMount() {
    setTimeout(() => {
      this.setState(() => ({
        dataSource: [
          {"country": "Mar", "amount": 3000 },
          {"country": "Abr", "amount": 520 },
          {"country": "May", "amount": 1500 },
          {"country": "Jun", "amount": 4200 },
          {"country": "Jul", "amount": 2540 },
          {"country": "Ago", "amount": 3500 },
          {"country": "Sep", "amount": 2750 },
          {"country": "Oct", "amount": 5350 },
          {"country": "Nov", "amount": 1200 },
          {"country": "Dic", "amount": 6500 },
        ]
      }))
    }, 500)
  }

  render() {
    return (
      <div className={'App'}>
        <Topbar topBarType={this.props.menuOpen ? 'dashboard' : 'innerpage'}/>
        <div className={`AppWrapper ${this.props.menuOpen ? 'AppWrapper_hidden' : 'AppWrapper_show'}`}>
          <Chart dataSource={this.state.dataSource}/>
        </div>
      </div>
    );
  }
}

export default connect(mapState)(App)
