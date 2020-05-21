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
    return {type: types.UPDATE_ORDER_SUCCESS, orders};
}



export function loadOrder() {
    return function(dispatch) {
        return OrderApi.getAllOrder().then( orders => {
            dispatch(loadOrderSuccess(orders));
        }).catch(error => {
            throw(error);
        });
    };
}

export function saveOrder(newOrder, currentOrder) {
    return function(dispatch) {
        return OrderApi.saveOrder(newOrder, currentOrder).then( orders => {
            dispatch(saveOrderSuccess(orders));
        }).catch(error => {
            throw(error);       
        });
    };
}

export function updateOrder(updatedOrder, orderList) {
    return function(dispatch) {
        return OrderApi.updateOrder(updatedOrder, orderList).then( orders => {
            dispatch(updateOrderSuccess(orders));
        }).catch(error => {
            throw(error);
        });
    };
}





