import React from 'react';
import MenuPage from '../component/menuPage';
import MenuApi from '../api/listMenuApi';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as menuAction from '../actions/menuAction';
import * as orderAction from '../actions/orderAction';
import Toastr from 'toastr';


class MainMenuPage extends React.Component {
	constructor(props, context) {
		debugger;
		super(props,context);
		this.state = {
			menu: this.props.menus,
			dataOrder: [],
            totalPrice: 0,
            display:"hide",
            button:"hide",
            newMenu: {image: "AyamKremes", name:"", description:"", price:0, quantity:0},
            order: "hide "

		};
		debugger;
        this.updateQuantity = this.updateQuantity.bind(this);	
        this.saveOrder = this.saveOrder.bind(this);
    }

	componentDidMount() {

		if (!this.props.addOrder) {
			MenuApi.getAllMenu().then( (menu) => { this.setState({menu: menu}); });
			this.calculateTotalPrice();
			debugger;
			return;
		} 
		MenuApi.updateMenuOrder(this.props.addOrder.orderList)
		.then(menuOrder => this.setState({menu: menuOrder}));

		this.setState({
			order:'list-order sticky',
			dataOrder: this.props.addOrder.orderList
		});
		this.calculateTotalPrice();
		debugger;
	}    
	updateQuantity(event, operation) {
		const field = event.target.name;
		let menu = Object.assign([], this.state.menu);
		let result;
		if (operation == "plus") {
            result = this.quantityOperation(menu,field, 1);
            this.setState({menu: result});
            
            
		} else {
            result = this.quantityOperation(menu,field, -1);
            this.setState({menu: result});
		}
		
		debugger;
		
	}

	quantityOperation(menu,field, operator) {
		let dataIndex = menu.findIndex(a => a.name == field);
		let newData = menu[dataIndex];
		let tempQuantity = newData['quantity'];
		let result = tempQuantity + operator;
		if (result < 0) {
			result = 0;
        }
        let finalData = Object.assign({}, newData, {quantity: result});
		this.addToOrderList(field, tempQuantity, finalData);
		menu.splice(dataIndex,1,finalData);
		this.calculateTotalPrice();
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
                this.setState({order: 'list-order sticky'});			
			}

		} else {
			if (tempQuantity > 0) {
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
                let quantity = menu['quantity']
                let price = menu['price']
				let totalOneMenu = quantity * price;
				totalPrice = totalPrice + totalOneMenu;	
            }
            
            if (totalPrice == 0) {
                this.setState({order: 'hide'});
            }
            
			this.setState({totalPrice: totalPrice});
			debugger;

		},0);
		
		debugger;
    }

    saveOrder() {
		let order = Object.assign([], this.state.dataOrder);
		sessionStorage.setItem('orderMenu', JSON.stringify(order));
		if (this.props.idOrder) {
			this.props.history.push('/cashier/'+ this.props.idOrder);
			return Toastr.success('Order updated!');
		}
		Toastr.success('Order confirmed!')
		this.props.history.push('/cashier');
        debugger;
	}

	userCheck() {
        if (sessionStorage.getItem("currentUserLogin") == null ) {
            this.props.history.push('/login');
            Toastr.info("Login Required")  
        }
    }


	render() {
		debugger;
		this.props;
		this.state;
        this.userCheck();

		return(
			<MenuPage 
				menu={this.state.menu}
				onClick={this.updateQuantity} 	
				dataOrder={this.state.dataOrder}
                totalPrice={this.state.totalPrice}
                display={this.state.display}
                hideButton={this.state.button}       
                newMenu={this.state.newMenu}     
                hideOrder={this.state.order}
                confirmOrder={this.saveOrder}
			/>

			);
	}
}

export function getOrder(id, ordersHistory) {
	let data = ordersHistory.find( orders => orders.id == id);
	debugger;
	return data;
}

export function mapStateToProps(state,ownProps) {
	let idOrder = ownProps.params.id;
	let addOrder;
	if (idOrder) {
		addOrder = getOrder(idOrder, state.orders);
		debugger;
	}
    debugger;
    return {
        menus: state.menus,
		order: state.orders,
		addOrder: addOrder,
		idOrder: idOrder
    };
    
}

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(menuAction, dispatch),
        orderAction: bindActionCreators(orderAction, dispatch)
    };
    
}

export default connect(mapStateToProps,mapDispatchToProps)(MainMenuPage);