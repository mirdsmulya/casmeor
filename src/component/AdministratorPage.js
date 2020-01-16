import React from 'react';
import Sidebar from '../common/Sidebar';

const AdministratorPage = () => {
    return(
        <div className="main">
            <div className="fixed-sidebar">
				<div className="sticky">
				<div className="header-logo">LOGO</div>
				<Sidebar/>
				</div>
			</div>
        </div>
    );
};
export default AdministratorPage;