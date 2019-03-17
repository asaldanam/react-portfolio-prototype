import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import css from '../ui-styles/c-virtual-keyboard.module.scss';
import { Flex, Box } from '../lib-components';

export default class VirtualKeyboard extends PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      keyboardNumbers: []
    }
  }

  static propTypes = {
    onClick: PropTypes.func
  }

  componentDidMount() {
    const randomOrderedNumbers = Array(10)
      .fill(0)
      .map((e, i) => e + i)
      .sort(() => 0.5 - Math.random())
    this.setState(() => ({keyboardNumbers: randomOrderedNumbers}))
  }

  render() {
    return (
      <Flex wrap>
        {this.state.keyboardNumbers.map(number => 
          <Box key={number} w={'20%'} className={css.numberBox} >
            <button onClick={(e) => this.props.onClick(number)} className={css.numberButton} >
              {number}
            </button>
          </Box>
        )}
      </Flex>
    )
  }

}
