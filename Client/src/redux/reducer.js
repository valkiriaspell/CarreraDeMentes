import { LOGIN_USER_GUEST, LIST_USERS_IN_PRE_ROOM, DELETE_USER_FROM_ROOM } from "./actions"

const initialState = {
    user: {},
    preRoomUsers: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_USER_GUEST: 
        return {
            ...state,
            user: action.payload
        }

        case LIST_USERS_IN_PRE_ROOM: 
        return {
            ...state,
            preRoomUsers: action.payload
        }

        case DELETE_USER_FROM_ROOM: 
        return {
            ...state,
            preRoomUsers: state.preRoomUsers.filter(user => user.email !== action.payload)
        }

        
        default:
            return state;
    }
}

export default reducer;
