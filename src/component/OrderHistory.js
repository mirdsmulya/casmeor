import React from 'react';
import OrderList from '../component/OrderList';


const OrderHistory = ({orderHistory, addOrder, confirmPayment, printBill, buttonDisable, deleteOrder}) => {
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
                    <th>Cashier</th>
                </tr> 
            </thead>
            <tbody>
                {orderHistory.map(orders => 
                    <OrderList key={orders.id} orders={orders} addOrder={addOrder} printBill={printBill} confirmPayment={confirmPayment} buttonDisable={buttonDisable} deleteOrder={deleteOrder} />
                )}
            </tbody>
            </table>
        </div>
    );
};

export default OrderHistory;