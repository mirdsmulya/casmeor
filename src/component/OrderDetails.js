import React from 'react';
import TextInput from '../common/textInput';


const OrderDetails = ({orderDetails, tableChange}) => {    
    
    return(
        <div>
            <div>
            <pre> Order Number  : {orderDetails.orderNumber}</pre>
            <pre> Cashier       : {orderDetails.cashierIdentity}</pre>
            <pre> Date          : {orderDetails.currentDate} </pre>
            <pre> Name          : <input value={orderDetails.name} onChange={tableChange} name="name" /> </pre>
            <pre> Table         : <input value={orderDetails.table} onChange={tableChange} name="table" type="number" /></pre>            
            </div>
        </div>
    );

};
export default OrderDetails;
