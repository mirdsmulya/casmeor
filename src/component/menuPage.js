import React from 'react';
import Sidebar from '../common/Sidebar';
import MenuBox from '../common/menuBox';
import OrderList from '../common/orderList';


const MenuPage = ({menu, onClick, dataOrder, totalPrice}) => {
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
						<h5>Your order:</h5>
                        {dataOrder.map(data =>
                            <OrderList key={data.name} data={data}
                        />)}
                       
                        <div className="total-order">
                            <p>Total:  {totalPrice}</p>
                        </div>
					</div>
				
                </div>
        </div>
    );
};
export default MenuPage;