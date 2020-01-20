import MenuApi from '../api/listMenuApi';
import * as types from './actionTypes';


export function loadMenuSuccess(menus) {
    return { type: types.LOAD_MENU_SUCCESS, menus};
    
}

export function saveMenuSuccess(menus) {
    return { tyep: types.SAVE_MENU_SUCCESS, menus};
    
}

export function deleteMenuSuccess(menus) {
    return { type: types.DELETE_MENU_SUCCESS, menus};
    
}

export function loadMenu() {
    return function(dispatch) {
        return MenuApi.getAllMenu().then(menus => {
            dispatch(loadMenuSuccess(menus));
        }).catch(error => {
            throw(error);
        });
        
        
    };  
}

export function saveMenu() {
    return function(dispatch) {
        return MenuApi.saveMenu().then( menus => {
            dispatch(saveMenuSuccess(menus));
        }).catch(error => {
            throw(error);
        });
        
    };
    
}


export function deleteMenu() {
    return function(dispatch) {
        return MenuApi.deleteMenu().then( menus => {
            dispatch(deleteMenuSuccess(menus));
        }).catch(error => {
            throw(error);
        });
        
    };
    
}