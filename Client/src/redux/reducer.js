import { LOGIN_USER_GUEST, LIST_USERS_IN_PRE_ROOM, LIST_ROOMS, SET_READY, NEW_USER, LOGIN, HOST, CREATE_ROOM, GET_AVATARS } from "./actions"


const initialState = {
    user: {},
    preRoomUsers: {},
    avatars: [],
    listRooms: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_USER_GUEST: 
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

        case LIST_ROOMS: 
        return {
            ...state,
            listRooms: action.payload
        }

/*         case SET_READY: 
        const index = state.preRoomUsers.users.findIndex(user => user.id === action.payload)
        state.preRoomUsers.users[index].ready
            ? state.preRoomUsers.users[index].ready === true
                ? state.preRoomUsers.users[index].ready = false
                : state.preRoomUsers.users[index].ready = true
            : state.preRoomUsers.users[index].ready = true
        return {
            ...state,
        } */

        case GET_AVATARS: 
        return {
            ...state,
            avatars: action.payload
        }

        
        default:
            return state;
    }
}

export default reducer;
