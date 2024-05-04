import { combineReducers } from "redux";
import {ACTION_TYPES} from "../utils/enums.ts";

class ActionPayload {
    description: string;
    extra: string;

    constructor(description: string, extra: string) {
        this.description = description;
        this.extra = extra;
    }
}

class Action {
    type: string;
    payload: ActionPayload;

    constructor(type: string, payload: ActionPayload) {
        this.type = type;
        this.payload = payload;
    }
}

const initialState = {
    user : {}
};

const userReducer = (state = initialState, action: Action) => {
    if (action.type === ACTION_TYPES.USER_AUTHORIZED) {
        return {...state, user: { authorized: true, content: action.payload.extra }};
    }
    else if (action.type === ACTION_TYPES.USER_UNAUTHORIZED){
        return {...state, user: { authorized: false, content: null }};
    }
    else return state;
};

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;