import React from 'react';


const OrderList = ({orders, printBill, addOrder}) => {
    debugger;
    return(
            <tr>
                <td>{orders.orderNumber}</td>
                <td>{orders.name} </td>
                <td>{orders.table} </td>
                <td>{orders.totalAmount} </td>
                <td>{orders.status} </td>
                <td><button className="btn" onClick={addOrder} name={orders.orderNumber}>Add Order</button> </td>
                <td><button className="btn" onClick={printBill} name={orders.orderNumber}>Print Bill</button> </td>
                <td><button classname="btn" >Confirm Payment</button> </td>

            </tr>

    );
};
export default OrderList;