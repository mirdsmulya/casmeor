import React, {propTypes} from 'react';
import { render } from 'react-dom';
import './styles/styles.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import MenuPage from './component/menuPage';
import MenuApi from './api/listMenuApi';


class App extends React.Component {
	constructor(props, context) {
		debugger;
		super(props,context);
		this.state = {
			menu: [
				{
					image: "",
					name: "Ayam Taliwang Bakar",
					description: "Nasi, ayam taliwang, sambel, tahu dan tempe",
					price: "32.000",
					quantity: 0
				},
				{
					image: "",
					name: "Ayam Bumbu Bali",
					description: "Nasi, ayam bumbu bali, sambel, tahu dan tempe",
					price: "40.000",
					quantity: 0
				},
				{
					image: "",
					name: "Ayam Geprek",
					description: "Nasi, ayam bumbu bali, sambel, tahu dan tempe",
					price: "15.000",
					quantity: 0
				},
				{
					image: "",
					name: "Ayam Kremes Medan",
					description: "Nasi, ayam bumbu bali, sambel, tahu dan tempe",
					price: "17.000",
					quantity: 0
				}
			]
		};
		debugger;
		


	}

	componentWillMount() {
		let menu = MenuApi.getAllMenu().then(
			//this.setState({menu: Object.assign([], menu) }) 
			
			
		)
		
		debugger;
		//this.getAllData();
	}

	getAllData() {
		let menu = MenuApi.getAllMenu();
		//this.setState({menu: Object.assign([], menu) });
		debugger;
	}

	increaseQuantity(event) {
		let quantity = 0
		let menu = Object.assign({}, this.state.menu);
		console.log("from menu[quantity]",menu[quantity]);
		menu[quantity] = menu[quantity] + 1;
		console.log("increase");
		
		return this.setState({menu: menu});
		
		
	}

	decreaseQuantity(event) {
		let quantity = 0
		let menu = Object.assign({}, this.state.menu);
		console.log("from menu[quantity]",menu[quantity]);
		
		if (menu[quantity] != 0) {
			menu[quantity] = menu[quantity] - 1;
			return this.setState({menu: menu});
		}
		

	}


	render() {
		debugger;
		console.log("From render",this.state.menu);
		
		return(
			<MenuPage 
				menu={this.state.menu}
				plusQty={this.increaseQuantity.bind(this)} 	
				minusQty={this.decreaseQuantity.bind(this)}
			/>

			);
	}
}

render(
		<App />,
	document.getElementById('app')
);
