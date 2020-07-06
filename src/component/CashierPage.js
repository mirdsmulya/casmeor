import React , { useRef } from 'react';
import Sidebar from '../common/Sidebar';
import OrderHistory from './OrderHistory';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as menuAction from '../actions/menuAction';
import * as orderAction from '../actions/orderAction';
import ConfirmModal from '../common/ConfirmModal';
import Toastr from 'toastr';
import { AuthCheck } from '../common/AuthCheck';
import BillPage from '../common/BillPage';
import OrderApi from '../api/listOrderApi';
import { getItemMenu } from './MainMenuPage';
import { getOrderState } from './MainMenuPage';



class CashierPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataOrder: [],
            totalPrice: 0,
            orderDetails: {name:"", table:""},
            orderHistory: [],
            showModal: "none",
            orderId: "",
            modalStatement: "",
            billData: {name:"", cashierIdentity:'', orderList:[], totalAmount:''},
            hideBillModals: "none",
            hideButton: "bill-button"
        };
    this.dataInputChange = this.dataInputChange.bind(this);
    this.addOrder = this.addOrder.bind(this);
    this.confirmPayment = this.confirmPayment.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.yesClick = this.yesClick.bind(this);
    this.modalAction = this.modalAction.bind(this);
    this.printBill = this.printBill.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.order !== this.state.orderHistory) {
            this.setState({ orderHistory: nextProps.order });
        }
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
        this.props.orderAction.updateOrder(orderUpdate, orderHistory, orderUpdate.id);
        return OrderApi.getItemMenu(idOrder)
        .then( (res) => {
            const billData = getOrderState(orderUpdate.id, orderHistory);
            const orderList = getItemMenu(res.orderList, this.props.menus);
            billData['orderList'] = orderList;
            this.setState({
                orderDetails: [], 
                dataOrder: [], 
                totalAmount: [],
                hideBillModals: "bill-modals",
                billData: billData
            });            
        });

    }

    closeModal() {
        this.setState({
            showModal: 'none',
            hideBillModals:'hide'
        });
    }

    printBill() {
        () => window.print();
    }

    modalAction(event) {
        this.setState({
            showModal: 'modals',
            orderId: event.target.name,
            modalStatement: "Apa kamu yakin mau hapus order ini?"
        });       
    }

    yesClick() {
        if (this.state.orderId == "") {
            return Toastr.info("Bill Print!");
        }
        const orders = Object.assign([],this.props.order);
        this.setState({showModal: 'hide'});
        this.props.orderAction.deleteOrder(this.state.orderId, orders);
    }

    render() {
        AuthCheck(this.props.history);
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
                    modalStatement={this.state.modalStatement}
                    yesClick={this.yesClick}
                    noClick={this.closeModal}
                    showModal={this.state.showModal}
                />

                <BillPage 
                    dataOrder={this.state.billData}
                    hideBillModals={this.state.hideBillModals}
                    hideButton={this.state.hideButton}
                    yesClick={this.printBill}
                    noClick={this.closeModal}
                    
                />

                
            </div>
        );
    }
}

export function mapStateToProps(state,ownProps) {
    const order = state.orders;
    const menus = state.menus;
    return {
        order: order,
        menus: menus
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(menuAction, dispatch),
        orderAction: bindActionCreators(orderAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CashierPage);



