import { GET_AVATARS } from "../actions"

const initialState= []

const avatars = (state = initialState, action) =>{
    switch (action.type) {

        case GET_AVATARS: 
        return {
            ...state,
            avatars: action.payload
        }
    
        default:
            return state;
    }
}

export default avatars