import React from 'react';

const OrderList = ({data}) => {
    return(
        <div>
        <h5>{data.name}</h5>
        <div className="price-qty-display">
            <p>{data.price} x {data.quantity}</p>
            <div>{data.price * data.quantity} </div>
        </div>
        </div>
    );
};
export default OrderList;