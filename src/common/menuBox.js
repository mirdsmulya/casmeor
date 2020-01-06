import React from 'react';


const MenuBox = () => {
    return (
        <div className="menu-box"> 
            <div className="border img"> Picture </div>
            <div className="detail-menu">
                <h4 className="dish-name "> Ayam Taliwang Komplit </h4>
                <p className="description"> 
                    Nasi, ayam taliwang, sambel, tahu dan tempe 
                </p>               
            </div>
            <div className="price-qty">
                <h5 className="price "> 23.000</h5>
                <div className="qty-box "> - [ 0 ] + </div>
            </div>

        </div>
    );

};
export default MenuBox;