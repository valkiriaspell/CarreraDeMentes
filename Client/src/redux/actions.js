import axios from 'axios';

export const LOGIN_USER_GUEST = 'LOGIN_USER_GUEST'
export const LIST_USERS_IN_PRE_ROOM = 'LIST_USERS_IN_PRE_ROOM'
export const SET_READY = 'SET_READY'



export function loginAsGuest(){
    return async function(dispatch){
        try{
            const {data} = await axios.get('/ruta para hacer post')
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

export function AddUserToPreRoom(user){
    return async function(){
        try{
            const {data} = await axios.post('/ruta para hacer post a una sala', user)
            console.log(data)
        }catch(e) {
            console.log(e)
        }
    }
}
export function listUseresInPreRoom(IdPreRoom){
    return async function(dispatch){
        try{
            const {data} = await axios.get(`/ruta para hacer post a una sala?IdPreRoom=${IdPreRoom}`)
            dispatch({type: 'LIST_USERS_IN_PRE_ROOM', payload: data})
        }catch(e) {
            console.log(e)
        }
    }
}

export function setReady(email){
    return function(dispatch){
        dispatch({type: 'SET_READY', payload: email})
    }
}