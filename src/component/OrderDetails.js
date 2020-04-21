import React from 'react';


const OrderDetails = ({orderDetails, tableChange}) => {    
    
    return(
        <div>
            <div>
            <pre> Order Number  : {orderDetails.orderNumber}</pre>
            <pre> Cashier       : {orderDetails.cashierIdentity}</pre>
            <pre> Date          : {orderDetails.currentDate} </pre>
            <pre> Name          : {orderDetails.name} </pre>
            <pre> Table         : {orderDetails.tableNumber} </pre>            
            </div>
        </div>
    );

};
export default OrderDetails;
