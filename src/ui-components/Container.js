import React, { memo } from 'react'
import PropTypes from 'prop-types'

const Container = memo(function Container(props) {

  const animations = {
    'in-out': { 
      animation: `fade-in 0.5s cubic-bezier(0.4, 0.1, 0.1, 0.9) ${props.animDelay}ms forwards`,
      opacity: 0
    }
  }

  const cx = {
    container: `${props.fullWidth ? '' : 'Container'}`
  }

  return (
    <div className={cx.container} style={animations[props.animType]}>
      {props.children}
    </div>
  )

})

Container.propTypes = {
  fullWidth: PropTypes.bool,
  animType: PropTypes.oneOf(['in-out']),
  animDelay: PropTypes.number
}

export default Container
