import React, { PureComponent } from 'react'
import MGlobalData from '../ui-modules/MGlobalData';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Flex, Box } from '../lib-components';

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}


export class PDashboard extends PureComponent {

  componentDidMount() {
    Router.bind(this);
  }
  
  render() {
    return (
      <div>
        <MGlobalData/>
        <Flex align={'center'} justify={'center'}>
          <Box py={32}> <Link to="/notfound">Ir a otra página>></Link> </Box>
        </Flex>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PDashboard)
