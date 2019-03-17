import React, { PureComponent, Fragment } from 'react'
import { Box, PassBubbles } from '../lib-components';
import { connect } from 'react-redux'
import VirtualKeyboard from '../ui-components/VirtualKeyboard';
import { random } from 'lodash';
import { setLoginError } from '../redux';


const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = dispatch => ({
  setLoginError: loginError => dispatch(setLoginError(loginError))
})

export class MAuthInput extends PureComponent {

  constructor(props){
    super(props)
    this.state = {
      code: [1, 0, 2, 0, 3, 0],
      passCode: [],
      hasError: '',
      disabledKeyboard: false
    }
  }

  componentDidMount() {
    this.setNewPassCode();
    console.log(this.props)
  }

  componentWillUnmount() {
    this.props.setLoginError({
      infoTxt: 'Introduce las posiciones que faltan de tu clave de seguridad.',
      hasError: false
    })
  }

  setNewPassCode() {
    this.setState(() => ({passCode: this.generatePassCode()}))
  }
  
  generatePassCode() {
    let hiddenPositions = []
    while (hiddenPositions.length < 3) {
      const randomNumber = random(5) + 1
      const checkNotIncludes = !hiddenPositions.includes(randomNumber)
      if (checkNotIncludes) {
        hiddenPositions.push(randomNumber);
      }
    }
    const newPassCode = this.state.code.map((number, index) => 
      hiddenPositions.includes(index + 1)
        ? null
        : number
    )
    return newPassCode;
  }

  validatePassCode(passCode) {
    const isComplete = !passCode.some(value => value === null);
    const checkMatch = passCode.join('') === this.state.code.join('')
    setTimeout(() => {
      if (isComplete && checkMatch) {
        this.props.onValidationOk();
      } 
      else if (isComplete) {
        this.props.setLoginError({
          infoTxt: 'Clave de seguridad incorrecta. Vuelve a introducir las posiciones',
          hasError: true
        })
        this.setNewPassCode();
      }
    }, 400)
  }

  setPassCode(value) {
    // this.setState(() => ({passCode: [5, null, 5, 5, null, 5]}));
    const position = this.state.passCode
      .findIndex(digit => digit === null);
    const newPassCode = this.state.passCode
      .map((digit, index) => index === position ? value : digit);
    if (position !== -1) {
      this.setState(() => ({passCode: newPassCode}));
    } 
    this.validatePassCode(newPassCode)
  }

  render() {
    return (
      <Fragment>
        <Box mb={3}>
          <PassBubbles
            passCode={this.state.passCode}
          />
        </Box>
        <VirtualKeyboard
          onClick={number => this.setPassCode(number)}
          disabled={this.state.disabledKeyboard}
        />
        {/* <button onClick={() => this.generatePassCode()}>Test</button> */}
      </Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MAuthInput)
