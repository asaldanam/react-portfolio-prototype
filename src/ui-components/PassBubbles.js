import React, { memo } from 'react'
import PropTypes from 'prop-types'
import css from '../ui-styles/c-pass-bubbles.module.scss'
import { Box, Flex } from '../lib-components';

const PassBubbles = memo(function PassBubbles(props) {

  const cxBubble = value => 
    value !== null 
      ? `${css.bubble} ${css.bubble_active}`
      : css.bubble

  return (
    <Flex justify={'center'} className={css.container}>
      {props.passCode.map((item, index) =>
        <Box key={index} px={'6px'}>
          <div className={cxBubble(item)}></div>
        </Box>
      )}
    </Flex>
  )
})

PassBubbles.propTypes = {
  passCode: PropTypes.arrayOf(PropTypes.number)
}

export default PassBubbles
