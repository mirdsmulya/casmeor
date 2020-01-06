import React, {propTypes} from 'react';
import { render } from 'react-dom';
import './styles/styles.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import Sidebar from './common/Sidebar';
import MenuBox from './common/menuBox';


class App extends React.Component {
	constructor(props, context) {
		super(props,context);
		this.state = {};

	}

	render() {
		return(
			<div className="main">
				<div className="fixed-sidebar">
					<div className="sticky">
					<div className="header-logo">LOGO</div>
					<Sidebar />
					</div>
				</div>
				<div className="line-menu">
					Line Menu
					<MenuBox />
				</div>
				<div className="order-line">
					Order Line
					
					<div className="list-order sticky">
						List Order
					</div>
				</div>
				

			</div>

			);
	}
}

render(
		<App />,
	document.getElementById('app')
);
