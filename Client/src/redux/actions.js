import axios from 'axios';

export const LOGIN_USER_GUEST = 'LOGIN_USER_GUEST'
export const LIST_USERS_IN_PRE_ROOM = 'LIST_USERS_IN_PRE_ROOM'
export const SET_READY = 'SET_READY'
export const NEW_USER = 'NEW_USER'
export const LOGIN = 'LOGIN'
export const HOST_TRUE = 'HOST_TRUE'
export const CREATE_ROOM = 'CREATE_ROOM'
export const GET_AVATARS = 'GET_AVATARS'



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

export function registerUser(user){
    return async function(dispatch){
        try{
            const {data} = await axios.post('http://localhost:3001/users', user)
            dispatch({type: 'NEW_USER', payload: data})
        }catch(e) {
            console.log(e)
        }
    }
}

export function loginUser(email){
    return async function(dispatch){
        try{
            const {data} = await axios.get(`http://localhost:3001/users?email=${email}`)
            dispatch({type: 'LOGIN', payload: data})
        }catch(e) {
            console.log(e)
        }
    }
}

export const updateUser = (userData)=> async ()=>{
    try {
        const result = await axios.post(`/ ruta para actualizar user`, userData)  
    } catch (error) {
        console.log(error)
    }
}

export function modifyHost(){
    return function(dispatch){
        dispatch({type: 'HOST_TRUE'})
    }
}

export function createRoom(user){
    return async function(dispatch){
        try{
            const {data} = await axios.post('http://localhost:3001/gameRoom', {name: user.name, idUser: user.id})
            dispatch({type: 'CREATE_ROOM', payload: data})
        }catch(e) {
            console.log(e)
        }
    }
}

export const getAvatars = ()=> async (dispatch)=>{
    try {
        const result = await axios.get(`http://localhost:3001/avatar`)
        dispatch({type: GET_AVATARS, payload: result.data}) 
    } catch (error) {
        console.log(error)
    }
} 

export function AddUserToPreRoom(idGameRoom, idUser){
    return async function(){
        try{
            const {data} = await axios.put('http://localhost:3001/gameRoom', {idUser, idGameRoom})
            console.log(data)
        }catch(e) {
            console.log(e)
        }
    }
}
//arreglar en back
export function listUsersInPreRoom(IdRoom){
    return async function(dispatch){
        try{
            const {data} = await axios.get(`http://localhost:3001/gameRoom?IdPreRoom=${IdRoom}`)
            dispatch({type: 'LIST_USERS_IN_PRE_ROOM', payload: data})
        }catch(e) {
            console.log(e)
        }
    }
}

export function setReady(email){
    return  function(dispatch){
            dispatch({type: 'SET_READY', payload: email})
    }
}