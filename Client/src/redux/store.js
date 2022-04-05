import { applyMiddleware, createStore} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import reducer from "./reducer";
/* import { combineReducers } from "redux";
import avatars from "./reducer2/avatars";
import listRooms from "./reducer2/listRooms";
import preRoomUsers from "./reducer2/preRoomUsers";
import user from "./reducer2/user";

const reducer = combineReducers({
    ava: avatars,
    lis: listRooms,
    pre: preRoomUsers,
    us: user
})
 */


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
