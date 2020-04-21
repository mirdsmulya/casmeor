import React from 'react';
import OrderList from '../common/orderList';

const OrderBoard = ({buttonText,confirmOrder, hideOrder, dataOrder,totalPrice, orderLine, orderDetails, detailInputChange}) => {
    debugger
    return (
        <div className={orderLine}>
			<div className={hideOrder}>
				
                {dataOrder.map(data =>
                <OrderList key={data.name} data={data}
                />)}
                <div className="total-order">
                <div className="">
                <pre> Name  : <input value={orderDetails.name} onChange={detailInputChange} name="name" /> </pre>
                <pre> Table : <input value={orderDetails.table} onChange={detailInputChange} name="table" type="number" /></pre>            
                </div>
                <p className="total-amount">Total: Rp{totalPrice}</p>
                </div>
                <button className="" onClick={confirmOrder}>{buttonText}</button>
			</div>
				
        </div>
    );
};
export default OrderBoard;