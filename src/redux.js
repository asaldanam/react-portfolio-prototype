/*
 * state
 */
const initialState = {
  menuOpen: false,
  scrollPosition: 0,
  user: {
    selectedAccount: 'all',
    accounts: [
      'ES7921000813610123456789',
      'ES9832030534462438007171'
    ]
  }
};

/*
 * action types
 */
const ACTION = {
  MENU_STATE_CHANGE: 'MENU_STATE_CHANGE',
  USER_ACCOUNT_SELECT: 'USER_ACCOUNT_SELECT'
}

/*
 * action creators
 */

export const menuStateChange = menuState => ({
  type: ACTION.MENU_STATE_CHANGE, payload: menuState
})

export const userAccountSelect = account => ({
  type: ACTION.USER_ACCOUNT_SELECT, payload: account
})

/*
 * reducers
 */
const rootReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case ACTION.MENU_STATE_CHANGE:
      return {
        ...prevState,
        menuOpen: action.payload.menuOpen,
        scrollPosition: action.payload.scrollPosition ? action.payload.scrollPosition : prevState.scrollPosition
      }
    case ACTION.USER_ACCOUNT_SELECT:
      return {
        ...prevState,
        user: {
          ...prevState.user,
          selectedAccount: action.payload
        }
      }
    default:
      return prevState;
  }
};

export default rootReducer;