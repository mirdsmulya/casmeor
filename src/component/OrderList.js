import React from 'react';


const OrderList = ({orders, printBill, addOrder, confirmPayment}) => {
    debugger;
    return(
            <tr>
                <td>{orders.orderNumber}</td>
                <td>{orders.name} </td>
                <td>{orders.table} </td>
                <td>{orders.totalAmount} </td>
                <td>{orders.status} </td>
                <td><button className="btn" onClick={addOrder} name={orders.id}>Add Order</button> </td>
                <td><button className="btn" onClick={printBill} name={orders.id}>Print Bill</button> </td>
                <td><button className="btn" onClick={confirmPayment} name={orders.id}>Confirm Payment</button> </td>

            </tr>

    );
};
export default OrderList;