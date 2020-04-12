import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function menuReducers(state = initialState.menus, action) {
    switch (action.type) {
        case types.LOAD_MENU_SUCCESS:
            return action.menus;
        case types.SAVE_MENU_SUCCESS:
            return action.menus;
        case types.DELETE_MENU_SUCCESS:
            return action.menus;
        default:
            return state;
    } 
}