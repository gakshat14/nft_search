import { Actions } from "../utils/constants";

export function reducer(state, action) {
    switch (action.type) {
        case Actions.CHANGE_TOKENS: 
            return {...state, tokens: action.payload.tokens}
        default:
            return state;
    }
}