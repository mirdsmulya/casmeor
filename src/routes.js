import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './component/App';
import MainMenuPage from './component/MainMenuPage';
import AdministratorPage from './component/AdministratorPage';
import { BrowserRouter } from 'react-router-dom';
import CashierPage from './component/CashierPage';
import AccountPage from './component/AccountPage';
import LoginPage from './component/LoginPage';


export default (

    <Route path="/" component={App} >
		<IndexRoute component={MainMenuPage} />
        <Route path="setting" component={AdministratorPage} />
        <Route path="cashier" component={CashierPage} />
        <Route path="account" component={AccountPage} /> 
        <Route path="login" component={LoginPage} />


	</Route>
      
);