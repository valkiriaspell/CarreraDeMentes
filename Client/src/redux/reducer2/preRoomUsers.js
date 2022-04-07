import { LIST_USERS_IN_PRE_ROOM, GET_READY_USER, CREATE_ROOM } from "../actions"

const initialState= {}

const preRoomUsers = (state = initialState, action) =>{
    switch (action.type) {

        case CREATE_ROOM: 
        return {
            ...state,
            preRoomUsers: action.payload
        }

        case LIST_USERS_IN_PRE_ROOM: 
        return {
            ...state,
            preRoomUsers: action.payload
        }

        case GET_READY_USER: 
        const index = state.preRoomUsers.users.findIndex(user => user.id === action.payload.id)
        state.preRoomUsers.users[index].ready = action.payload.bool
        return {
            ...state,
        }
    
        default:
            return state;
    }
}

export default preRoomUsers;