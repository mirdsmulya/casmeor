import React from 'react';


const OrderList = ({orders, printBill, addOrder, confirmPayment}) => {
    let buttonDisable = false ;
    if (orders.status == "PAID") {
        buttonDisable = true;
     }

    return(
            <tr>
                <td>{orders.orderNumber}</td>
                <td>{orders.name} </td>
                <td>{orders.table} </td>
                <td>{orders.totalAmount} </td>
                <td>{orders.status} </td>
                <td><button className="btn" onClick={addOrder} name={orders.id} disabled={buttonDisable}>Add Order</button> </td>
                <td><button className="btn" onClick={printBill} name={orders.id} disabled={buttonDisable}>Print Bill</button> </td>
                <td><button className="btn" onClick={confirmPayment} name={orders.id} disabled={buttonDisable}>Confirm Payment</button> </td>
            </tr>
    );
};
export default OrderList;