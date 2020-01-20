import { combineReducers } from 'redux';
import menus from './menuReducer';


const rootReducers = combineReducers({ 
    menus
});

export default rootReducers;