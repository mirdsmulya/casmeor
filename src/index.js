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
			menu: [],
			dataOrder: [],
			totalPrice: 0

		};
		debugger;
		this.updateQuantity = this.updateQuantity.bind(this);
	}

	componentDidMount() {
		
		MenuApi.getAllMenu().then( (menu) => {
			this.setState({menu: menu});
		});
			
		
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
		debugger;
		
	}

	quantityOperation(menu,field, operator) {
		let dataIndex = menu.findIndex(a => a.name == field);
		let newData = menu[dataIndex];
		let tempQuantity = newData['quantity'];
		newData['quantity'] = newData['quantity'] + operator;

		if (newData['quantity'] < 0) {
			newData['quantity'] = 0;
		}
		
		this.addToOrderList(field, tempQuantity, newData);
		menu.splice(dataIndex,1,newData);
		let cal = () => this.calculateTotalPrice();
		this.calculateTotalPrice();
		let total = this.state.dataOrder
		debugger;
		return menu;
	}

	addToOrderList(field, tempQuantity, newData) {
		let dataOrder = Object.assign([], this.state.dataOrder);
		let dataIndex =	dataOrder.findIndex(a => a.name == field );
		debugger;
		if ( dataIndex < 0) {
			if (tempQuantity == 0 && newData['quantity'] == 1){
				dataOrder.splice(0,0, newData);
				this.setState({dataOrder: dataOrder});			
			}

		} else {
			if (tempQuantity > 1) {
				dataOrder.splice(dataIndex,1, newData);
				this.setState({dataOrder: dataOrder});
			}
			if (tempQuantity == 1 && newData['quantity'] == 0) {
				dataOrder.splice(dataIndex,1);
				this.setState({dataOrder: dataOrder});
			}
		}
	}

	calculateTotalPrice() {
		setTimeout( () => {
			let dataOrder = Object.assign([], this.state.dataOrder);
			let lengthOrder = dataOrder.length;
			let totalPrice =0;
			for (let i=0; i < lengthOrder; i++) {
				let menu = dataOrder[i];
				let totalOneMenu = menu['quantity'] * menu['price']
				totalPrice = totalPrice + totalOneMenu;	
			}
			this.setState({totalPrice: totalPrice});
			debugger;

		},0);
		
		debugger;
	}

	render() {
		debugger;
		console.log("From render",this.state.menu);
		console.log("dataOrderState", this.state.dataOrder);
		console.log("totalAmount", this.state.totalPrice);
		
		
		
		return(
			<MenuPage 
				menu={this.state.menu}
				onClick={this.updateQuantity} 	
				dataOrder={this.state.dataOrder}
				totalPrice={this.state.totalPrice}
			/>

			);
	}
}

render(
		<App />,
	document.getElementById('app')
);
