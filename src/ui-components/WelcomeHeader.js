import React, { memo } from 'react'
import PropTypes from 'prop-types'
import css from '../ui-styles/c-welcome-header.module.scss'
import { Box } from '../lib-components';

const WelcomeHeader = memo(function WelcomeHeader(props) {

  const cx = {
    aditionalInfo: `${css.aditionalInfo} ${props.hasError ? css.aditionalInfo_error : ''}`
  }

  return (
    <div className={css.container}>
      <Box className={css.welcomeTitle} pb={1}>
        {props.titleTxt}
      </Box>
      <Box className={cx.aditionalInfo}>
        {props.infoTxt}
      </Box>
    </div>
  )
})

WelcomeHeader.propTypes = {
  titleTxt: PropTypes.string,
  infoTxt: PropTypes.string,
  hasError: PropTypes.bool
}

export default WelcomeHeader