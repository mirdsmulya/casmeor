


import React from 'react';
import Sidebar from '../common/Sidebar';
import MenuBox from '../common/menuBox';


const MenuPage = ({menu, onClick }) => {
    return (
        <div className="main">
				<div className="fixed-sidebar">
					<div className="sticky">
					<div className="header-logo">LOGO</div>
					<Sidebar />
					</div>
				</div>

				<div className="line-menu">
					Line Menu

                    {menu.map(dataMenu =>
                        <MenuBox key={dataMenu.name} dataMenu={dataMenu}
                        onClick={onClick}
                    />)}
					
				</div>

				<div className="order-line">
					Order Line
					<div className="list-order sticky ">
						Your order:
                        <div className="total-order">
                        <p>Total: Rp. 0 ,- </p>
                        </div>
					</div>
				
                </div>
        </div>
    );
};
export default MenuPage;