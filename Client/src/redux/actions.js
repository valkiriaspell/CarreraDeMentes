import axios from 'axios';

export const LOGIN_USER_GUEST = 'LOGIN_USER_GUEST'
export const UPDATE_USER = 'UPDATE_USER'



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

export const updateUser = (userData)=> async (dispatch)=>{
    try {
        const result = await axios.post(`/ ruta para actualizar user`, userData)  
    } catch (error) {
        console.log(error)
    }
}