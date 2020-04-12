import React from 'react';
import OrderList from '../common/orderList';

const OrderBoard = ({buttonText,confirmOrder, hideOrder, dataOrder,totalPrice, orderLine}) => {
    return (
        <div className={orderLine}>
			<div className={hideOrder}>
				
                {dataOrder.map(data =>
                <OrderList key={data.name} data={data}
                />)}
                <div className="total-order">
                <p className="total-amount">Total: Rp{totalPrice}</p>
                </div>
                <button onClick={confirmOrder}>{buttonText}</button>
			</div>
				
        </div>
    );
};
export default OrderBoard;