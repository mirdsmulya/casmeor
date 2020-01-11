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
		this.updateQuantity = this.updateQuantity.bind(this);


	}

	componentWillMount() {
		let menu = MenuApi.getAllMenu().then(
			//this.setState({menu: Object.assign([], menu) }) 
		);
		debugger;
		//this.getAllData();
	}

	getAllData() {
		let menu = MenuApi.getAllMenu();
		//this.setState({menu: Object.assign([], menu) });
		debugger;
	}

	updateQuantity(event, operation) {
		const field = event.target.name;
		let menu = Object.assign([], this.state.menu);
		let result;
		if (operation == "plus") {
			result = this.quantityOperation(menu,field, 1);
		} else {
			result = this.quantityOperation(menu,field, -1);
		}
		this.setState([], Object.assign({menu: result}));
	}

	quantityOperation(menu,field, operator) {
		let dataIndex = menu.findIndex(a => a.name == field);
		let newData = menu[dataIndex];
		newData['quantity'] = newData['quantity'] + operator;
		if (newData['quantity'] < 0) {
			newData['quantity'] = 0;
		}
		menu.splice(dataIndex,1,newData);
		return menu;
	}

	render() {
		debugger;
		console.log("From render",this.state.menu);
		
		return(
			<MenuPage 
				menu={this.state.menu}
				onClick={this.updateQuantity} 	
			/>

			);
	}
}

render(
		<App />,
	document.getElementById('app')
);
