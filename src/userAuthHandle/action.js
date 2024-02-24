import {LOGIN,LOGOUT} from './constants'
export const login = (userData)=>{
    return {
        type: LOGIN,
        payload: userData,
    }
}
export const logout = () => ({
    type: LOGOUT,
  });