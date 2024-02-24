import {LOGIN, LOGOUT} from './constants'

const initialState = {
    isLoggedIn: false,
    user: "emptyEmail",
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN:
        console.log("i really came here in login of authReducer"+action.payload)
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: true,
          user: "emptyEmail"
        };
      default:
        return state;
    }
  };
  
  export default authReducer;