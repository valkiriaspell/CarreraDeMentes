import { LOGIN_USER_GUEST, NEW_USER, LOGIN, HOST } from "../actions"

const initialState= {}

const user = (state = initialState, action) =>{
    switch (action.type) {

        case LOGIN_USER_GUEST: 
        console.log('reducer')
        return {
            ...state,
            user: action.payload
        }

        case NEW_USER: 
        return {
            ...state,
            user: action.payload
        }

        case LOGIN: 
        return {
            ...state,
            user: action.payload
        }

        case HOST: 
        return {
            ...state,
            user: action.payload
        }
    
        default:
            return state;
    }
}

export default user;