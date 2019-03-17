/*
 * state
 */
const initialState = {
  menuOpen: false,
  login: {
    welcomeTxt: 'Bienvenido, ',
    infoTxt: 'Introduce las posiciones que faltan de tu clave de seguridad.',
    hasError: false
  },
  user: {
    userName: 'Abel',
    userSurname: 'Saldaña Martínez',
    userAccountType: 'Cuenta Nómina',
    // userAvatar: 'https://media.licdn.com/dms/image/C5603AQGFMmgZIcpn6A/profile-displayphoto-shrink_200_200/0?e=1557964800&v=beta&t=LIkHozPYZgQ7sXoz5BpPrLkBJMi220PG4ipKRS6O_n0'
  }
};

/*
 * action types
 */
const ACTION = {
  MENU_STATE_CHANGE: 'MENU_STATE_CHANGE',
  SET_USER_DATA: 'SET_USER_DATA',
  SET_LOGIN_ERROR: 'SET_LOGIN_ERROR'
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

export const setLoginError = loginError => ({
  type: ACTION.SET_LOGIN_ERROR, payload: loginError
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
    case ACTION.SET_LOGIN_ERROR:
      return {
        ...prevState,
        login: {
          ...prevState.login,
          infoTxt: action.payload.infoTxt,
          hasError: action.payload.hasError
        }
      }
    default:
      return prevState;
  }
};

export default rootReducer;