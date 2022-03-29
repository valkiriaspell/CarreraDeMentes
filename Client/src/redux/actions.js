import axios from 'axios';

export const LOGIN_USER_GUEST = 'LOGIN_USER_GUEST'

export function loginAsGuest(userGuest){
    return async function(dispatch){
        try{
            const {data} = await axios.post('/ruta para hacer post', userGuest)
            dispatch({type: 'LOGIN_USER_GUEST', payload: data})
        }catch(e) {
            console.log(e)
        }
    }
}