import * as types from '../actions/actionTypes';
import initialState from './initialState';



export default function orderReducer(state = initialState.orders, action) {
    debugger;
    switch (action.type) {
        case types.LOAD_ORDER_SUCCESS:
            return action.orders;
        case types.SAVE_ORDER_SUCCESS:
            return action.orders;
        case types.UPDATE_ORDER_SUCCESS:
            return action.orders;

        default:
            return state;
    }
}