import { combineReducers } from 'redux';
import menus from './menuReducer';
import orders from './orderReducer';


const rootReducers = combineReducers({ 
    menus,
    orders
});

export default rootReducers;