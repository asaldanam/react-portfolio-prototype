import React, { memo } from 'react'
import PropTypes from 'prop-types'
import css from '../styles/c-user-profile.module.scss';
import { Flex, Box } from '../lib-components';

const UserProfile = memo(function UserProfile(props) {

  const getAvatarFallback = 'AS';

  const cx = {
    avatar: `${css.avatar} ${props.avatarSrc ? '' : css.avatar_fallback}`
  }
  console.log(props)
  return (
    <Flex align={'center'} className={css.userProfile}>
      <Box mr={'1rem'} className={cx.avatar}>
        { props.avatarSrc
          ? <img className={css.avatarSrc} src={props.avatarSrc} alt={props.avatarSrc}/>
          : <div>{getAvatarFallback}</div>
        }
      </Box>
      <Box w={'calc(100% - 64px - 1rem)'}>
        <div>
          <div className={css.user}>
            {`${props.nameTxt} ${props.surnameTxt}`}
          </div>
          <div className={css.userAltTxt}>{props.userAltTxt}</div>
        </div>
      </Box>
    </Flex>
  )
})

UserProfile.PropTypes = {
  nameTxt: PropTypes.string,
  surnameTxt: PropTypes.string,
  avatarSrc: PropTypes.string,
  userAltTxt: PropTypes.string,
}

export default UserProfile
