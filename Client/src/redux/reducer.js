import { LOGIN_USER_GUEST, LIST_USERS_IN_PRE_ROOM, LIST_ROOMS, GET_READY_USER, NEW_USER, LOGIN, HOST, CREATE_ROOM, GET_AVATARS, GET_QUESTIONS } from "./actions"


const initialState = {
    user: {},
    preRoomUsers: {},
    avatars: [],
    listRooms: [],
    newQuestions: []
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

        case GET_READY_USER: 
        const index = state.preRoomUsers.users.findIndex(user => user.id === action.payload.id)
        state.preRoomUsers.users[index].ready = action.payload.ready
        return {
            ...state,
        }

        case GET_AVATARS: 
        return {
            ...state,
            avatars: action.payload
        }
        case GET_QUESTIONS: 
        return {
            ...state,
            newQuestions: action.payload
        }

        
        default:
            return state;
    }
}

export default reducer;
