import React from 'react';


const MenuBox = ({dataMenu, plusQty, minusQty} ) => {
    return (
        <div className="menu-box"> 
            <div className="border img">Picture</div>
            <div className="detail-menu">
            <h4 className="dish-name "> {dataMenu.name}</h4>
                <p className="description"> 
                    {dataMenu.description}
                </p>               
            </div>
            <div className="price-qty">
                <h5 className="price "> {dataMenu.price} </h5>
                <div className="qty-box "> <button onClick={minusQty}>-</button>  {dataMenu.quantity}  <button onClick={plusQty}>+</button> </div>
            </div>

        </div>
    );

};
export default MenuBox;