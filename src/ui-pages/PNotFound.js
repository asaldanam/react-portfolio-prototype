import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom";
import { Flex, Box } from '../lib-components';

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export class PNotFound extends PureComponent {

  componentDidMount() {
    Router.bind(this);
  }

  render() {
    return (
      <div>
        <Flex align={'center'} justify={'center'}>
          <Box py={32}>
            Página no encontrada
          </Box>
        </Flex>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PNotFound)
