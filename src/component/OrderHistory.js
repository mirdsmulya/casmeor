import React from 'react';
import OrderList from '../component/OrderList';


const OrderHistory = ({orderHistory}) => {
    debugger;
    return(
        <div className="margin-top ">
            <table className="table">
            <thead>
                <tr>
                    <th>Order Number</th>
                    <th>Name</th>
                    <th>Table</th>
                    <th>Total Amount</th>
                    <th>Payment Status</th>
                </tr> 
            </thead>
            <tbody>
                {orderHistory.map(orders => 
                    <OrderList key={orders.orderNumber} orders={orders} />
                )}
            </tbody>
            </table>
        </div>
    );
};

export default OrderHistory;