import { LOGIN_USER_GUEST, LIST_USERS_IN_PRE_ROOM, SET_READY } from "./actions"

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

        case SET_READY: 
        let index = state.preRoomUsers.findIndex(user => user.email === action.payload)
        state.preRoomUsers[index].ready = true
        return {
            ...state,
        }
        
        default:
            return state;
    }
}

export default reducer;
