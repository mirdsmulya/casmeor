import React from 'react';
import MainMenuPage from './MainMenuPage';
import AdministratorPage from './AdministratorPage';
import CashierPage from './CashierPage';
import { Route } from 'react-router-dom';


const App = () => {
    return(
        <div>
            <Route exact path="/" component={MainMenuPage} />
            <Route path="/administrator" component={AdministratorPage} /> 
            <Route path="/cashier" component={CashierPage} />
        </div>
    );
};

export default App;