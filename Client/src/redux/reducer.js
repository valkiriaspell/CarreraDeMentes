import { LOGIN_USER_GUEST } from "./actions"

const initialState = {
    user: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_USER_GUEST: 
        return {
            ...state,
            user: action.payload
        }
        default:
            return state;
    }
}

export default reducer;
