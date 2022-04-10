import { LOGIN_USER_GUEST, FAST_REMOVE, ALL_USERS, UPDATE_POINTS, HOST_BY_ID, REMOVE_USER, LIST_USERS_IN_PRE_ROOM, LIST_ROOMS, GET_READY_USER, NEW_USER, LOGIN, HOST, CREATE_ROOM, GET_AVATARS, GET_NEW_QUESTIONS, USER_TOKEN, GET_ALL_QUESTIONS } from "./actions"


const initialState = {
    user: {},
    preRoomUsers: {},
    avatars: [],
    listRooms: [],
    newQuestions: [],
    userToken: {},
    totalUsers: [],
    questions:[]
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

        case ALL_USERS: 
        return {
            ...state,
            totalUsers: action.payload
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

        case REMOVE_USER: 
        state.preRoomUsers.users = action.payload
        return {
            ...state,
        }

        case FAST_REMOVE: 
        const arr = state.preRoomUsers.users.filter(user => user.id !== action.payload)
        return {
            ...state,
            preRoomUsers: arr
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

        case HOST_BY_ID: 
        const newHost = state.preRoomUsers.users.findIndex(user => user.id === action.payload.id)
        state.preRoomUsers.users[newHost].host = action.payload.host
        return {
            ...state,
        }

        case GET_AVATARS: 
        return {
            ...state,
            avatars: action.payload
        }
        case GET_NEW_QUESTIONS: 
        return {
            ...state,
            newQuestions: action.payload
        }
        case GET_ALL_QUESTIONS: 
        return {
            ...state,
            questions: action.payload
        }
        case USER_TOKEN:
            return {
                ...state,
                userToken: {token: action.payload}
            }
        case UPDATE_POINTS:
            const points = state.preRoomUsers.users.findIndex(user => user.id === action.payload.id)
        state.preRoomUsers.users[points].points = action.payload.pointsTotal
            return {
                ...state,
            }

        
        default:
            return state;
    }
}

export default reducer;
