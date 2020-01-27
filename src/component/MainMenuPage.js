import React from 'react';
import MenuPage from '../component/menuPage';
import MenuApi from '../api/listMenuApi';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as menuAction from '../actions/menuAction';
import * as orderAction from '../actions/orderAction';


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
            
            
            //this.saveOrder();
			this.setState({totalPrice: totalPrice});
			debugger;

		},0);
		
		debugger;
    }

    saveOrder() {
        let order = Object.assign([], this.state.dataOrder);
        this.props.orderAction.saveOrder(order);
        debugger;
    }


	render() {
		debugger;
		console.log("From render",this.state.menu);
		console.log("dataOrderState", this.state.dataOrder);
        console.log("totalAmount", this.state.totalPrice);
        console.log(this.props.order);
        

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

export function mapStateToProps(state,ownProps) {
    let order = state.orders;
    let menus = state.menus;
    debugger;
    return {
        menus: state.menus,
        order: state.orders
        
    };
    
}

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(menuAction, dispatch),
        orderAction: bindActionCreators(orderAction, dispatch)
        //actions: bindActionCreators(orderAction, dispatch)
    };
    
}

export default connect(mapStateToProps,mapDispatchToProps)(MainMenuPage);