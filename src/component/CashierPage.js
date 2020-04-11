import React from 'react';
import Sidebar from '../common/Sidebar';
import OrderBoard from './orderBoard';
import OrderDetails from './OrderDetails';
import OrderHistory from './OrderHistory';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as menuAction from '../actions/menuAction';
import * as orderAction from '../actions/orderAction';
import ConfirmModal from '../common/ConfirmModal';
//import Printer, { print } from 'react-pdf-print';

import Toastr from 'toastr';

class CashierPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataOrder: [],
            totalPrice: 0,
            orderDetails: {},
            orderHistory: [],
            showModal: "modals"
        };
    this.confirmOrder = this.confirmOrder.bind(this);
    this.orderDetails = this.orderDetails.bind(this);
    this.dataInputChange = this.dataInputChange.bind(this);
    this.addOrder = this.addOrder.bind(this);
    this.confirmPayment = this.confirmPayment.bind(this);
    this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        

    }

    componentWillMount() {

        let data = JSON.parse(sessionStorage.getItem('orderMenu')) ;
        this.setState({dataOrder: data});
        debugger;

        this.calculateTotalPrice();
        if (this.props.idOrder) {
            return this.setState({orderDetails: this.props.orderGet});       
        }
        this.orderDetails();

    }

    componentWillReceiveProps() {
        this.setState({orderHistory: this.props.order});
        this.calculateTotalPrice();
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

			this.setState({totalPrice: totalPrice});
			debugger;
		},0);	
		debugger;
    }

    confirmOrder(event) {
        event.preventDefault();
        let data = Object.assign({}, this.state.orderDetails);
        let orders = Object.assign([], this.state.dataOrder );
        let totalAmount = this.state.totalPrice;
        let lastOrderNumb = this.props.order.slice(-1)[0];
        data['totalAmount'] = totalAmount;
        data['orderList'] = orders;

        if (this.props.idOrder) {
            this.props.orderAction.updateOrder(data);
            this.setState({orderDetails: [], dataOrder: [], totalAmount: []});
            return Toastr.success("Order Updated!")
        }

        if (data['name'] == "" || data['table'] == "") {
            return Toastr.warning('Please fill customer and table name!');
        }
        
        if (data['orderNumber'] != lastOrderNumb['orderNumber'] && data['name'] != "") {
            this.props.orderAction.saveOrder(data);
            Toastr.success('Order confirmed!');
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
            const history = Object.assign({}, this.props.order.slice(-1)[0]);
            const orderNumb = history['orderNumber']+ 1;
            debugger;
            const idNumber = orderNumb + newDate.getDate() + "" + (newDate.getMonth()+1) + "" + newDate.getFullYear();
            const orderDetail = {
                id: idNumber,
                timeOrder: time,
                cashierIdentity: cashier, 
                currentDate: dateString, 
                orderNumber: orderNumb, 
                table: "",
                name: "",
                status: "Unpaid",
                orderList: [],
                totalAmount: 0 
            };
        debugger;
        this.setState({orderDetails: orderDetail});
        }, 50);        
    }


    dataInputChange(event) {
        
        const field = event.target.name;
        let data = Object.assign({}, this.state.orderDetails);
        data[field] = event.target.value;
        debugger;
        return this.setState({orderDetails: data});

    }

    addOrder(event) {
        let id = event.target.name;
        this.props.history.push('/'+ id); 
    }
    
    confirmPayment(event) {
        let idOrder = event.target.name;
        let orderHistory = Object.assign([], this.props.order);
        let orderData = orderHistory.find( order => order.id == idOrder);

        if (orderData.status == "PAID") {
            return Toastr.warning('Payment already made!')
        }

        let orderUpdate = Object.assign({}, {status: "PAID"});
        orderUpdate = Object.assign({}, orderData, orderUpdate);
        this.props.orderAction.updateOrder(orderUpdate);
        this.setState({orderDetails: [], dataOrder: [], totalAmount: []});

        Toastr.success('Payment from '+ orderData.name +' accepted!');
        debugger;
    }

    closeModal() {
        this.setState({showModal: 'none'})
    }

    userCheck() {
        if (sessionStorage.getItem("currentUserLogin") == null ) {
            this.props.history.push('/login');
            Toastr.info("Login Required");  
        }
    }


    render() {
        console.log(this.state);
        console.log(this.props);
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
                    
                    dataOrder={this.state.dataOrder}
                    totalPrice={this.state.totalPrice}
                    orderLine="cashier-line" 
                    buttonText="Confirm Order"
                    confirmOrder={this.confirmOrder}
                    totalPrice={this.state.totalPrice}
                />
                
                </div>
                <OrderHistory 
                    orderHistory={this.props.order}
                    addOrder={this.addOrder}
                    buttonDisable={this.state.buttonDisable}
                    confirmPayment={this.confirmPayment}
                
                />

                <ConfirmModal 
                    modalStatement="Apa kamu yakin mau simpan order ini?"
                    yesClick=""
                    noClick={this.closeModal}
                    showModal={this.state.showModal}

                />
                    
            </div>
        );
    }

    
}
 
export function getOrder(idOrder, orderHistory) {
    let findOrder = orderHistory.find((a) => a.id == idOrder);
    return findOrder;

}

export function mapStateToProps(state,ownProps) {
    let idOrder = ownProps.params.id;
    let orderGet;
    if (idOrder) {
        orderGet = getOrder(idOrder, state.orders);
    }
    
    let order = state.orders;
    let menus = state.menus;
    debugger;
    return {
        order: order,
        menu: menus,
        idOrder: idOrder,
        orderGet: orderGet
        
    };
    
}

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(menuAction, dispatch),
        orderAction: bindActionCreators(orderAction, dispatch)
    };
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CashierPage);



