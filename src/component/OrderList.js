import React from 'react';


const OrderList = ({orders, printBill, addOrder, confirmPayment, deleteOrder}) => {
    let buttonDisable = false ;
    if (orders.paymentStatus == "PAID") {
        buttonDisable = true;
     }

    return(
            <tr>
                <td>{orders.orderNumber}</td>
                <td>{orders.name} </td>
                <td>{orders.tableNumber} </td>
                <td>{orders.totalAmount} </td>
                <td>{orders.paymentStatus} </td>
                <td>{orders.cashierIdentity} </td>
                <td><button className="btn" onClick={addOrder} name={orders.id} disabled={buttonDisable}>Add Order</button> </td>
                <td><button className="btn" onClick={confirmPayment} name={orders.id} disabled={buttonDisable}>Confirm Payment</button> </td>
                <td><button className="btn" onClick={printBill} name={orders.id}>Print Bill</button> </td>
                <td><button className="btn btn-danger" onClick={deleteOrder} name={orders.id} >Delete</button> </td>

            </tr>
    );
};
export default OrderList;