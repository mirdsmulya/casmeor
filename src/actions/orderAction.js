import OrderApi from '../api/listOrderApi';
import * as types from './actionTypes';



export function loadOrderSuccess(orders) {
    return {type: types.LOAD_ORDER_SUCCESS, orders};
}

export function saveOrderSuccess(orders) {
    return {type: types.SAVE_ORDER_SUCCESS, orders};
}

export function deleteOrderSuccess(orders) {
    return {type: types.DELETE_ORDER_SUCCESS, orders};
}

export function updateOrderSuccess(orders) {
    return {type: types.UPDATE_ORDER_SUCCESS, orders}
}



export function loadOrder() {
    return function(dispatch) {
        debugger;
        return OrderApi.getAllOrder().then( orders => {
            dispatch(loadOrderSuccess(orders));
        }).catch(error => {
            throw(error);
        });
    };
}

export function saveOrder(newOrder) {
    return function(dispatch) {
        debugger;
        return OrderApi.saveOrder(newOrder).then( orders => {
            dispatch(saveOrderSuccess(orders));
        }).catch(error => {
            throw(error);
            
        });
    };
}

export function updateOrder(updatedOrder) {
    return function(dispatch) {
        debugger;
        return OrderApi.updateOrder(updatedOrder).then( orders => {
            dispatch(updateOrderSuccess(orders));
        }).catch(error => {
            throw(error);
        });
    };
}





