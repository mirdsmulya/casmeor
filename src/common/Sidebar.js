
import React from 'react';
import { render } from 'react-dom';
import { Link, IndexLink } from 'react-router-dom';

const Sidebar = ({onClick}) => {
    return (
 
        <div className="fixed-sidebar">
				<div className="sticky">
				<div className="header-logo">LOGO</div>
                     <div className="sidebar">
                            <div className="sidebar-text-box">
                                <Link  activeClassName="active" className="sidebar-text" onClick={onClick} name="admin" >Administrator</Link>
                            </div>
                            <div className="sidebar-text-box">
                                <Link to="/"  activeClassName="active" className="sidebar-text" onClick={onClick} name="menu"> Menu and Order</Link>
                            </div>
                            <div className="sidebar-text-box">
                                <Link to="cashier" activeClassName="active" className="sidebar-text" > Cashier</Link>
                            </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;