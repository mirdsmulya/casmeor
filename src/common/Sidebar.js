
import React from 'react';
import { render } from 'react-dom';
import { Link, IndexLink } from 'react-router';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div><Link to="#administrator" activeClassName="active">Administrator</Link></div>
            <div><Link to="#menu" activeClassName="active"> Menu and Order</Link></div>
            <div><Link to="#cashier" activeClassName="active"> Cashier</Link></div>
        </div>
    );
};

export default Sidebar;