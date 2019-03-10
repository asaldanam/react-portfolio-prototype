/*
 * state
 */
const initialState = {
  menuOpen: false,
  user: {
    userName: 'Abel',
    userSurname: 'Saldaña Martínez',
    userAccountType: 'Cuenta Nómina',
    // userAvatar: 'https://media.licdn.com/dms/image/C5603AQGFMmgZIcpn6A/profile-displayphoto-shrink_200_200/0?e=1557964800&v=beta&t=LIkHozPYZgQ7sXoz5BpPrLkBJMi220PG4ipKRS6O_n0'
    // selectedAccount: 'all',
    // accounts: [
    //   'ES7921000813610123456789',
    //   'ES9832030534462438007171'
    // ]
  }
};

/*
 * action types
 */
const ACTION = {
  MENU_STATE_CHANGE: 'MENU_STATE_CHANGE',
  SET_USER_DATA: 'SET_USER_DATA'
}

/*
 * action creators
 */
export const menuStateChange = menuOpen => ({
  type: ACTION.MENU_STATE_CHANGE, payload: menuOpen
})

export const setUserData = userData => ({
  type: ACTION.SET_USER_DATA, payload: userData
})

/*
 * reducers
 */
const rootReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case ACTION.MENU_STATE_CHANGE:
      return {
        ...prevState,
        menuOpen: action.payload
      }
    case ACTION.SET_USER_DATA:
      return {
        ...prevState,
        menuOpen: action.payload,
        user: {
          ...prevState.user,
          userName: action.payload.user,
          userSurname: action.payload.surname,
          userAccountType: action.payload.account,
          userAvatar: action.payload.avatar,
        }
      }
    default:
      return prevState;
  }
};

export default rootReducer;