
import React from 'react';
import { render } from 'react-dom';
import { Link, IndexLink } from 'react-router-dom';

const Sidebar = ({onClick}) => {
    return (
        <div className="sidebar">
            <div className="sidebar-text-box">
                <Link to="administrator" activeClassName="active" className="sidebar-text" >Administrator</Link>
            </div>
            <div className="sidebar-text-box">
                <Link to="/" activeClassName="active" className="sidebar-text" > Menu and Order</Link>
            </div>
            <div className="sidebar-text-box">
                <Link to="cashier" activeClassName="active" className="sidebar-text" > Cashier</Link>
            </div>
        </div>
    );
};

export default Sidebar;