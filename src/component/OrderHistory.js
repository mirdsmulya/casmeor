import React from 'react';
import OrderList from '../component/OrderList';


const OrderHistory = ({orderHistory, addOrder, confirmPayment, printBill, buttonDisable}) => {
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
                    <OrderList key={orders.id} orders={orders} addOrder={addOrder} printBill={printBill} confirmPayment={confirmPayment} buttonDisable={buttonDisable} />
                )}
            </tbody>
            </table>
        </div>
    );
};

export default OrderHistory;