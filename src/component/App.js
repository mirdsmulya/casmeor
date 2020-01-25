import React from 'react';
import MainMenuPage from './MainMenuPage';
import AdministratorPage from './AdministratorPage';
import CashierPage from './CashierPage';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../common/Sidebar';


class App extends React.Component {
    
    
	render() {
        console.log(this.props.children);
        debugger;
		return(
            <BrowserRouter>
			<div className="">

				{this.props.children}

			</div>
            </BrowserRouter>
			);
	}
}


export default App;