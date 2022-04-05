import { LIST_ROOMS } from "../actions"

const initialState= []

const listRooms = (state = initialState, action) =>{
    switch (action.type) {

        case LIST_ROOMS: 
        return {
            ...state,
            listRooms: action.payload
        }
    
        default:
            return state;
    }
}

export default listRooms;