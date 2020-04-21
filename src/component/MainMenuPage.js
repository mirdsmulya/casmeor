import React from 'react';
import MenuPage from '../component/menuPage';
import MenuApi from '../api/listMenuApi';
import ConfirmModal from '../common/ConfirmModal';
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
			order: "hide ",
			orderDetails: {name:"", table:""},
			showModal:"hide"
		};
        this.updateQuantity = this.updateQuantity.bind(this);	
		this.saveOrder = this.saveOrder.bind(this);
		this.dataInputChange = this.dataInputChange.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.toCashierPage = this.toCashierPage.bind(this);
    }

	componentDidMount() {
		const actualOrder = this.props.addOrder;
		if (!actualOrder) {
			MenuApi.getAllMenu().then( (menu) => { this.setState({menu: menu}); });
			this.calculateTotalPrice();
			return;
		} 
		MenuApi.updateMenuOrder(actualOrder.orderList)
		.then(menuOrder => this.setState({menu: menuOrder}));

		this.setState({
			order:'list-order sticky',
			dataOrder: this.props.addOrder.orderList,
			orderDetails: {name: actualOrder.name, table: actualOrder.tableNumber}
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
		if (this.state.orderDetails['name'] == "" || this.state.orderDetails['table'] == "") {
            return Toastr.warning('Please fill customer and table name!');
        } 
		this.setState({showModal: "modals"});	
	}

	orderDetails() {
        const newDate = new Date();
        const dateString = newDate.getDate() + "/" + (newDate.getMonth()+1)  + "/" + newDate.getFullYear();
		const time = newDate.getTime();
		const details = Object.assign({}, this.state.orderDetails);
		const order = Object.assign([], this.state.dataOrder);
        const cashier = sessionStorage.getItem('currentUserLogin');
        const history = Object.assign({}, this.props.order.slice(-1)[0]);
        const orderNumb = history['orderNumber']+ 1;
		const idNumber = orderNumb + newDate.getDate() + "" + (newDate.getMonth()+1) + "" + newDate.getFullYear();
		const orderDetail = {
            id: idNumber,
            timeOrder: time,
            cashierIdentity: cashier, 
            currentDate: dateString, 
            orderNumber: orderNumb, 
            tableNumber: details.table,
            name: details.name,
            paymentStatus: "Unpaid",
			orderList: [...order],
            totalAmount: this.state.totalPrice 
        };
        return orderDetail; 
    }

	dataInputChange(event) {
        const field = event.target.name;
        const data = Object.assign({}, this.state.orderDetails);
        data[field] = event.target.value;
        return this.setState({orderDetails: data});
	}
	
	closeModal() {
        this.setState({showModal: 'none'});
	}
	
	toCashierPage() {
		if (this.props.idOrder) {
			const previoustOrder = this.props.addOrder;
			const orders = Object.assign([], this.state.dataOrder);
			const orderDetails = Object.assign({}, this.state.orderDetails);
			previoustOrder['totalAmount'] = this.state.totalPrice;
			previoustOrder['orderList'] = orders;
			previoustOrder['name'] = orderDetails.name;
			previoustOrder['tableNumber'] = orderDetails.table;
			this.props.orderAction.updateOrder(previoustOrder);
			this.props.history.push('/cashier/'+ this.props.idOrder);
			return Toastr.success("Order Updated!");
		}
		const order = this.orderDetails();
		const lastOrderNumb = this.props.order.slice(-1)[0];
		if (order['orderNumber'] != lastOrderNumb['orderNUmber'] ) {
			this.props.orderAction.saveOrder(order);
			this.props.history.push('/cashier');
			Toastr.success("Order tersimpan!");            
			return;     
		}
		this.setState({showModal: "none"});
        Toastr.error('Order already made!'); 
	}


	userCheck() {
        if (sessionStorage.getItem("currentUserLogin") == null ) {
            this.props.history.push('/login');
            Toastr.info("Login Required");  
        }
    }


	render() {
		this.userCheck();
		return(
			<div>
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
				detailInputChange={this.dataInputChange}
				orderDetails={this.state.orderDetails}
			/>

			<ConfirmModal 
                modalStatement="Apa kamu yakin mau simpan order ini?"
                yesClick={this.toCashierPage}
                noClick={this.closeModal}
                showModal={this.state.showModal}
            />

			</div>
			
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