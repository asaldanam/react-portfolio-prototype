import React, { memo } from 'react'
import PropTypes from 'prop-types'
import css from '../ui-styles/c-menu-item.module.scss';
import { Flex, Box } from '../lib-components';

const MenuItem = memo(function MenuItem(props) {

  return (
    <Flex className={css.container} align={'center'}>
      <Box className={css.icon} w={40} mr={'1rem'}>
        <img src={props.iconSrc} alt={props.iconSrc} />
      </Box>
      <Box className={css.text} w={'0 0 auto'}>
        {props.itemTxt}
      </Box>
    </Flex>
  )
})

MenuItem.propTypes = {
  iconSrc: PropTypes.string,
  itemTxt: PropTypes.string
}

export default MenuItem;

