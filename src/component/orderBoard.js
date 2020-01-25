

import React from 'react';
import OrderList from '../common/orderList';

const OrderBoard = ({hideOrder, dataOrder,totalPrice, orderLine}) => {
    return (
        <div className={orderLine}>
			<div className={hideOrder}>
				<h5>Your order:</h5>
                {dataOrder.map(data =>
                <OrderList key={data.name} data={data}
                />)}
                       
                <div className="total-order">
                <p className="total-amount">Total:  {totalPrice}</p>
                </div>
			</div>
				
        </div>
    );
};
export default OrderBoard;