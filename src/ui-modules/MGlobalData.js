import React, { PureComponent, Fragment } from 'react'
import { Chart, Box, DataHeader } from '../lib-components';

export class MGlobalData extends PureComponent {

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
          {'country': 'Mar', 'amount': 3000 },
          {'country': 'Abr', 'amount': 520 },
          {'country': 'May', 'amount': 1500 },
          {'country': 'Jun', 'amount': 4200 },
          {'country': 'Jul', 'amount': 2540 },
          {'country': 'Ago', 'amount': 3500 },
          {'country': 'Sep', 'amount': 2750 },
          {'country': 'Oct', 'amount': 5350 },
          {'country': 'Nov', 'amount': 1200 },
          {'country': 'Dic', 'amount': 3200 },
          {'country': 'Ene', 'amount': 4050 },
          {'country': 'Feb', 'amount': 6500 },
        ]
      }))
    }, 500)
  }

  render() {
    return (
      <Fragment>
        <Box px={16} pt={8} mb={16}>
          <DataHeader title={'Saldo global'} amount={'10.520,35€'}/>
        </Box>
        <Box px={16}>
          <Chart dataSource={this.state.dataSource}/>  
        </Box>
      </Fragment>
    )
  }
}

export default MGlobalData
