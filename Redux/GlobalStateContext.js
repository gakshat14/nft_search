import React, { useReducer } from 'react';
import { createAPIResource } from '../utils/constants';
import { reducer } from './Reducer';

export const StateContext = React.createContext({ state: null, dispatch: null });

/**
 * {
        "balance": "15000000000000000000",
        "contractAddress": "0x0f1b956128ac17407c29c5600983c6cedf3b2820",
        "decimals": "18",
        "name": "softbalanced.com",
        "symbol": "USBL",
        "type": "ERC-20"
    }
 */

const initialState = {
    tokens: createAPIResource()
};

export function GlobalStateContext(props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <StateContext.Provider value={{state, dispatch}}>
            {props.children}
        </StateContext.Provider>
    );
}