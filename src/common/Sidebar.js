import React from 'react';
import { Link, IndexLink } from 'react-router';
import Toastr from 'toastr';

const Sidebar = (properties) => {
    const username =  sessionStorage.getItem("currentUserLogin");
    const sidebar = username ? "sidebar" : "hide";
    return (

        <div className="fixed-sidebar ">
				<div className="sticky ">
				<div className="header-logo">
                <div className="">
                <button className={properties.signOut} onClick={() => { sessionStorage.removeItem("expired_time"); 
                                                                        sessionStorage.removeItem("access_token");
                                                                        sessionStorage.removeItem("currentUserLogin"); 
                                                                        properties.props.push('/login'); 
                                                                        Toastr.info("Sign Out");
                                                                        }}>Sign Out</button>
                                    <p className="sidebar-text">{username}</p>
                </div>  

                </div>
                     <div className={sidebar}>
                            
                    <IndexLink to="/"  activeClassName="active" className="sidebar-text" > 
                    <div className="sidebar-text-box">Menu and Order</div>
                    </IndexLink>
                   
                        <div className="setting-bar">
                            <div className="sidebar-text-box-dd">
                                <div to="/setting" activeClassName="active" className="sidebar-text    "  >Settings</div>
                            </div>
                            <div className="dropdown-content">
                                <Link to="/account" activeClassName="active" className="sidebar-text" >
                                    <li className="sidebar-text-box">Account </li>
                                </Link>
                                                 
                                <Link to="/setting" activeClassName="active" className="sidebar-text" >
                                    <li className="sidebar-text-box"> Menu  </li>
                                </Link>
                                       
                            </div>
                        </div>
                        <Link to="/cashier" activeClassName="active" className="sidebar-text" > 
                            <div className="sidebar-text-box">Cashier</div>
                        </Link>                   
                    </div>
            </div>
        </div>
    );
};

export default Sidebar;