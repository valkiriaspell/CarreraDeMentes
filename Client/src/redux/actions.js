import axios from 'axios';

export const LOGIN_USER_GUEST = 'LOGIN_USER_GUEST'

export function LoginAsGuest(userGuest){
    return async function(dispatch){
        try{
        const {data} = axios.post('/ruta para hacer post', {userGuest})
        data => dispatch({type: 'LOGIN_USER_GUEST', payload: data})
        }catch(e) {
            e => console.log(e)
        }

    }
}