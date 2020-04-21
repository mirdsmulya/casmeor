import React from 'react';
import Sidebar from '../common/Sidebar';
import MenuBox from '../common/menuBox';
import MenuInput from './MenuInput';
import OrderBoard from './orderBoard';


const MenuPage = ({confirmOrder, uploadTextButton, menu, onClick, dataOrder, totalPrice, display, hideButton, deleteButton, onChange, newMenu, saveButton, hideOrder, upload, detailInputChange, orderDetails}) => {
    return (
        <div className="main">
				
				<Sidebar />
				<div className="line-menu">
                    <MenuInput display={display} uploadTextButton={uploadTextButton} onChange={onChange} newMenu={newMenu} saveButton={saveButton} upload={upload}/>
                    {menu.map(dataMenu =>
                        <MenuBox key={dataMenu.name} dataMenu={dataMenu}
                        hide={hideButton}
                        deleteButton={deleteButton}
                        onClick={onClick}
                    />)}
					
				</div>
				<OrderBoard 
                    hideOrder={hideOrder}
                    dataOrder={dataOrder}
                    totalPrice={totalPrice}
                    orderLine="order-line"
                    confirmOrder={confirmOrder}
                    buttonText=" Order"
                    detailInputChange={detailInputChange}
                    orderDetails={orderDetails}
                />
        </div>
    );
};
export default MenuPage;