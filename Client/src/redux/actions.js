import axios from 'axios';

export const LOGIN_USER_GUEST = 'LOGIN_USER_GUEST'

export function LoginAsGuest(userGuest){
    return async function(dispatch){
        try{
        const {data} = await axios.post('/ruta para hacer post', {userGuest})
        return dispatch({type: 'LOGIN_USER_GUEST', payload: data})
        }catch(e) {
          return console.log(e)
        }

    }
}