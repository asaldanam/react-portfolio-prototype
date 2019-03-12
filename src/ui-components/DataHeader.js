import React, { memo } from 'react'
import PropTypes from 'prop-types'
import css from '../ui-styles/c-data-header.module.scss'
import { Box } from '../lib-components';

const DataHeader = memo(function DataHeader(props) {
  return (
    <Box>
      <div className={css.title}>{props.title}</div>
      <div className={css.amount}>{props.amount}</div>
    </Box>
  )
})

DataHeader.propTypes = {
  title: PropTypes.string,
  amount: PropTypes.string
}

export default DataHeader
