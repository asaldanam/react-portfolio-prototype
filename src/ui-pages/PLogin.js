import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Link } from "react-router-dom";
import { WelcomeHeader, Box, Flex } from '../lib-components';
import MAuthInput from '../ui-modules/MAuthInput';

const mapStateToProps = state => ({
  userName: state.user.userName,
  login: state.login
})

const mapDispatchToProps = {
  
}


export class PLogin extends PureComponent {

  componentDidMount() {
    Router.bind(this);
  }

  goTo(path) {
    this.props.history.push(path)
  }
  
  render() {
    console.log('PLogin', this.props)
    return (
      <div>
        <Box px={2} pt={1} mb={3}>
          <WelcomeHeader 
            titleTxt={`${this.props.login.welcomeTxt} ${this.props.userName}`}
            infoTxt={this.props.login.infoTxt}
            hasError={this.props.login.hasError}
          />
        </Box>
        <Box px={2}>
          <MAuthInput
            onValidationOk={() => this.goTo('/dashboard')}
          />
        </Box>
        <Flex align={'center'} justify={'center'}>
          <Box py={32}>
            <Link to="/notfound">Tengo problemas para acceder »</Link>
          </Box>
        </Flex>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PLogin)
