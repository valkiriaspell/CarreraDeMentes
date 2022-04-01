import { LOGIN_USER_GUEST, LIST_USERS_IN_PRE_ROOM, SET_READY, NEW_USER, LOGIN, HOST_TRUE, CREATE_ROOM, GET_AVATARS } from "./actions"


const initialState = {
    user: {},
    preRoomUsers: [],
    avatars: []
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

        case HOST_TRUE: 
        state.user.host = true
        return {
            ...state,
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

        case SET_READY: 
        const index = state.preRoomUsers.findIndex(user => user.email === action.payload)
        state.preRoomUsers[index].ready
            ? state.preRoomUsers[index].ready === true
                ? state.preRoomUsers[index].ready = false
                : state.preRoomUsers[index].ready = true
            : state.preRoomUsers[index].ready = true
        return {
            ...state,
        }
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
