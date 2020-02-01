import React from 'react';
import Sidebar from '../common/Sidebar';
import OrderBoard from './orderBoard';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as menuAction from '../actions/menuAction';
import Toastr from 'toastr'

class CashierPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataOrder: this.props.order,
            totalPrice: 0
        };
    this.confirmPayment = this.confirmPayment.bind(this);
    }

    componentWillMount() {
        this.calculateTotalPrice();
    }

    componentWillReceiveProps(nextProps) {
		if (this.props.orders !== nextProps.orders) {
			this.setState({dataOrder: Object.assign({}, nextProps.orders)});
        }
		debugger;
	}

    calculateTotalPrice() {
		setTimeout( () => {
			let dataOrder = Object.assign([], this.state.dataOrder);
			let lengthOrder = dataOrder.length;
			let totalPrice =0;
			for (let i=0; i < lengthOrder; i++) {
				let menu = dataOrder[i];
				let totalOneMenu = menu['quantity'] * menu['price'];
				totalPrice = totalPrice + totalOneMenu;	
            }
            
            if (totalPrice == 0) {
                this.setState({order: 'hide'});
            }
            //this.props.orderAction.saveOrder(Object.assign([], this.state.dataOrder));


			this.setState({totalPrice: totalPrice});
			debugger;

		},0);
		
		debugger;
    }

    confirmPayment() {
        let a;
    }

    userCheck() {
        if (sessionStorage.getItem("currentUserLogin") == null ) {
            this.props.history.push('/login');
            Toastr.info("Login Required")  
        }
    }


    render() {
        console.log(this.state.dataOrder);
        console.log(this.props.order);
        console.log(this.props.menu);
        this.userCheck();
        debugger;
        
        return(
            <div className="main">
                <Sidebar/>
                <OrderBoard
                    
                    dataOrder={this.props.order}
                    totalPrice={this.state.totalPrice}
                    orderLine="cashier-line" 
                    buttonText="Confirm Payment"
                    confirmOrder={this.confirmPayment}
                    totalPrice={this.state.totalPrice}
                />
            </div>
        );
    }

    
}
   

export function mapStateToProps(state,ownProps) {
    
    let order = state.orders;
    let menus = state.menus;
    debugger;
    return {
        order: order,
        menu: menus
        
    };
    
}

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(menuAction, dispatch)
        
    };
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CashierPage);



