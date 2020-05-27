import React from 'react';
import Sidebar from '../common/Sidebar';
import OrderHistory from './OrderHistory';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as menuAction from '../actions/menuAction';
import * as orderAction from '../actions/orderAction';
import ConfirmModal from '../common/ConfirmModal';
import Toastr from 'toastr';


class CashierPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataOrder: [],
            totalPrice: 0,
            orderDetails: {name:"", table:""},
            orderHistory: [],
            showModal: "none",
            orderId: ""
        };
    this.dataInputChange = this.dataInputChange.bind(this);
    this.addOrder = this.addOrder.bind(this);
    this.confirmPayment = this.confirmPayment.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.modalAction = this.modalAction.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({orderHistory: this.props.order});
	}    

    dataInputChange(event) {
        const field = event.target.name;
        const data = Object.assign({}, this.state.orderDetails);
        data[field] = event.target.value;
        return this.setState({orderDetails: data});
    }

    addOrder(event) {
        const id = event.target.name;
        this.props.history.push('/'+ id); 
    }
    
    confirmPayment(event) {
        const idOrder = event.target.name;
        const orderHistory = Object.assign([], this.props.order);
        const orderData = orderHistory.find( order => order.id == idOrder);
        if (orderData.paymentStatus == "PAID") {
            return Toastr.warning('Payment already made!');
        }

        let orderUpdate = Object.assign({}, {paymentStatus: "PAID"});
        orderUpdate = Object.assign({}, orderData, orderUpdate);
        this.props.orderAction.updateOrder(orderUpdate, orderHistory);
        this.setState({orderDetails: [], dataOrder: [], totalAmount: []});
        Toastr.success('Payment from '+ orderData.name +' accepted!'); 
    }

    closeModal() {
        this.setState({showModal: 'none'});
    }

    modalAction(event) {
        this.setState({
            showModal: 'modals',
            orderId: event.target.name
        });       
    }

    deleteOrder() {
        const orders = Object.assign([],this.props.order);
        this.setState({showModal: 'hide'});
        this.props.orderAction.deleteOrder(this.state.orderId, orders);
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
            <div className="main">
                <Sidebar props={this.props.history}/>

                <OrderHistory 
                    orderHistory={this.props.order}
                    addOrder={this.addOrder}
                    buttonDisable={this.state.buttonDisable}
                    confirmPayment={this.confirmPayment}
                    deleteOrder={this.modalAction}
                
                />
                <ConfirmModal 
                    modalStatement="Apa kamu yakin mau hapus order ini?"
                    yesClick={this.deleteOrder}
                    noClick={this.closeModal}
                    showModal={this.state.showModal}
                />
            </div>
        );
    }
}
 
export function getOrder(idOrder, orderHistory) {
    const findOrder = orderHistory.find((a) => a.id == idOrder);
    return findOrder;
}

export function mapStateToProps(state,ownProps) {
    const idOrder = ownProps.params.id;
    let orderGet;
    if (idOrder) {
        orderGet = getOrder(idOrder, state.orders);
    }
    const order = state.orders;
    const menus = state.menus;
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



