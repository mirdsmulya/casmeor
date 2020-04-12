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
        this.updateQuantity = this.updateQuantity.bind(this);	
        this.saveOrder = this.saveOrder.bind(this);
    }

	componentDidMount() {
		if (!this.props.addOrder) {
			MenuApi.getAllMenu().then( (menu) => { this.setState({menu: menu}); });
			this.calculateTotalPrice();
			return;
		} 
		MenuApi.updateMenuOrder(this.props.addOrder.orderList)
		.then(menuOrder => this.setState({menu: menuOrder}));

		this.setState({
			order:'list-order sticky',
			dataOrder: this.props.addOrder.orderList
		});
		this.calculateTotalPrice();
	}    
	updateQuantity(event, operation) {
		const field = event.target.name;
		const menu = Object.assign([], this.state.menu);
		let result;
		if (operation == "plus") {
            result = this.quantityOperation(menu,field, 1);
            this.setState({menu: result});      
		} else {
            result = this.quantityOperation(menu,field, -1);
            this.setState({menu: result});
		}		
	}

	quantityOperation(menu,field, operator) {
		const dataIndex = menu.findIndex(a => a.name == field);
		const newData = menu[dataIndex];
		const tempQuantity = newData['quantity'];
		let result = tempQuantity + operator;
		if (result < 0) {
			result = 0;
        }
        const finalData = Object.assign({}, newData, {quantity: result});
		this.addToOrderList(field, tempQuantity, finalData);
		menu.splice(dataIndex,1,finalData);
		this.calculateTotalPrice();
		return menu;
	}

	addToOrderList(field, tempQuantity, newData) {
		const dataOrder = Object.assign([], this.state.dataOrder);
		const dataIndex =	dataOrder.findIndex(a => a.name == field );
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
			const dataOrder = Object.assign([], this.state.dataOrder);
			const lengthOrder = dataOrder.length;
			let totalPrice =0;
			for (let i=0; i < lengthOrder; i++) {
                
                const menu = dataOrder[i];
                const quantity = menu['quantity'];
                const price = menu['price'];
				const totalOneMenu = quantity * price;
				totalPrice = totalPrice + totalOneMenu;	
            }          
            if (totalPrice == 0) {
                this.setState({order: 'hide'});
            }        
			this.setState({totalPrice: totalPrice});
		},0);
    }

    saveOrder() {
		let order = Object.assign([], this.state.dataOrder);
		sessionStorage.setItem('orderMenu', JSON.stringify(order));
		if (this.props.idOrder) {
			this.props.history.push('/cashier/'+ this.props.idOrder);
			return ;
		}
		this.props.history.push('/cashier');
	}

	userCheck() {
        if (sessionStorage.getItem("currentUserLogin") == null ) {
            this.props.history.push('/login');
            Toastr.info("Login Required");  
        }
    }


	render() {
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
	const data = ordersHistory.find( orders => orders.id == id);
	return data;
}

export function mapStateToProps(state,ownProps) {
	const idOrder = ownProps.params.id;
	let addOrder;
	if (idOrder) {
		addOrder = getOrder(idOrder, state.orders);
	}
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