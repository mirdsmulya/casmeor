import React from 'react';
import Sidebar from '../common/Sidebar';
import OrderBoard from './orderBoard';
import OrderDetails from './OrderDetails';
import OrderHistory from './OrderHistory';
import ListOrderApi from '../api/listOrderApi';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as menuAction from '../actions/menuAction';
import Toastr from 'toastr';

class CashierPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataOrder: [],
            totalPrice: 0,
            orderDetails: {},
            orderHistory: []
        };
    this.confirmOrder = this.confirmOrder.bind(this);
    this.orderDetails = this.orderDetails.bind(this);
    this.dataInputChange = this.dataInputChange.bind(this);
    }

    componentDidMount() {
        ListOrderApi.getAllHistoryOrder()
        .then((result)=> this.setState({orderHistory: result}));
        debugger;

    }

    componentWillReceiveProps(nextProps) {
		if (this.props.order !== nextProps.order) {
            this.setState({dataOrder: Object.assign({}, nextProps.order)});
           
        }
        this.setState({dataOrder: this.props.order})
        this.calculateTotalPrice();
        this.orderDetails();
		debugger;
	}

    calculateTotalPrice() {
		setTimeout( () => {
			let dataOrder = Object.assign([], this.props.order);
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

			this.setState({totalPrice: totalPrice});
			debugger;

		},0);
		
		debugger;
    }

    confirmOrder() {
        let data = Object.assign({}, this.state.orderDetails);
        let totalAmount = this.state.totalPrice;
        let lastOrderNumb = this.state.orderHistory.slice(-1)[0];
        data['totalAmount'] = totalAmount;
        debugger;
        if (data['orderNumber'] != lastOrderNumb['orderNumber']) {
            ListOrderApi.saveOrderHistory(data)
            .then(orders => { 
                this.setState({orderHistory: orders});
                Toastr.success('Order confirmed!');
            });
            return;
            
        }
        Toastr.error('Order already made!');
    }

    orderDetails() {
        setTimeout(() => {

            const newDate = new Date();
            const dateString = newDate.getDate() + "/" + (newDate.getMonth()+1)  + "/" + newDate.getFullYear();
            const time = newDate.getTime();
            const cashier = sessionStorage.getItem('currentUserLogin');
            const history = Object.assign({}, this.state.orderHistory.slice(-1)[0]);
            const orderNumb = history['orderNumber']+ 1;
            const orderDetail = {
                timeOrder: time,
                cashierIdentity: cashier, 
                currentDate: dateString, 
                orderNumber: orderNumb, 
                table: "",
                name: "",
                status: "Unpaid",
                totalAmount: 0 
            };
        debugger;
        this.setState({orderDetails: orderDetail});
        }, 0);        
    }


    dataInputChange(event) {
        
        const field = event.target.name;
        let data = Object.assign({}, this.state.orderDetails);
        data[field] = event.target.value;
        debugger;
        return this.setState({orderDetails: data});

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
        console.log(this.orderDetails);
        //this.orderDetails();
        this.userCheck();
        debugger;
        
        return(
            <div className="main">
                <Sidebar/>
                <div>
                <div>Order Details</div>
                <OrderDetails 
                    orderDetails={this.state.orderDetails}
                    tableChange={this.dataInputChange}
                />
                <OrderBoard
                    
                    dataOrder={this.props.order}
                    totalPrice={this.state.totalPrice}
                    orderLine="cashier-line" 
                    buttonText="Confirm Order"
                    confirmOrder={this.confirmOrder}
                    totalPrice={this.state.totalPrice}
                />

                
                </div>
                <OrderHistory 
                    orderHistory={this.state.orderHistory}
                
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



