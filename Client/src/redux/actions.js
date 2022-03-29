import axios from 'axios';

export const LOGIN_USER_GUEST = 'LOGIN_USER_GUEST'
export const UPDATE_USER = 'UPDATE_USER'



export function LoginAsGuest(userGuest){
    return async function(dispatch){
        try{
        const {data} = await axios.post('/ruta para hacer post', {userGuest})
        return dispatch({type: LOGIN_USER_GUEST, payload: data})
        }catch(e) {
          return console.log(e)
        }
    }
}

export const updateUser = (userData)=> async (dispatch)=>{
    try {
        const result = await axios.post(`/ ruta para actualizar user`, userData)  
    } catch (error) {
        console.log(error)
    }
}