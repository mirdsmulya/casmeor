import React from 'react';
import Sidebar from '../common/Sidebar';
import MenuBox from '../common/menuBox';
import OrderList from '../common/orderList';
import MenuInput from './MenuInput';


const MenuPage = ({menu, onClick, dataOrder, totalPrice, display, hideAction, hideButton, deleteButton, onChange, newMenu, saveButton}) => {
    return (
        <div className="main">
				
				<Sidebar onClick={hideAction}/>
				<div className="line-menu">
					Line Menu
                    <MenuInput display={display} onChange={onChange} newMenu={newMenu} saveButton={saveButton}/>
                    {menu.map(dataMenu =>
                        <MenuBox key={dataMenu.name} dataMenu={dataMenu}
                        hide={hideButton}
                        deleteButton={deleteButton}
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
                            <p className="total-amount">Total:  {totalPrice}</p>
                        </div>
					</div>
				
                </div>
        </div>
    );
};
export default MenuPage;