

import React, { connect,bindActionCreators } from 'react';
import OrderList from './orderList';
import * as menuAction from '../actions/menuAction';


// class BillBox extends React.Component {
//     constructor(props) {
//         super(props);
//         debugger;
//     }
//     render() {
//         this.props;
//         debugger;
//         return(
//             <div className="bill-modal-box border">
//                 <div className="bill-modal-text">
//                 <h1>Yam Nyam!</h1>
//                 <h2>Dijamin Yummy!</h2>
//                 <p>Jl. Pegangsaan timur No. 45, Jakarta Pusat, DKI Jakarta, Telepon: 085721479846</p>
//                 <p>-----------------------------------------------------</p>
//                 <p> Customer : {dataOrder.name} </p>
//                 <p> Cashier :  {dataOrder.cashierIdentity} </p>
//                 <p> Date    : {dataOrder.currentDate} </p>
//             </div>
//             <div>
//                 <div >
//                     <div className="bill-modal-text">
                        
                        
//                         {dataOrder.orderList.map(data =>
//                          <OrderList key={data.id} data={data}
//                         />)}

//                         <p className="total-amount">Total: Rp {dataOrder.totalAmount} </p>
//                     </div>
//                     <div className={hideButton}>
//                         <button className="btn btn-primary" onClick={yesClick}>Print Bill</button>
//                         <button className="btn btn-danger" onClick={noClick}>Cancel</button> 


//                     </div>
//                 </div>
				
//             </div>
//             </div>
            
//         );
//     }


// }


// export function mapStateToProps(state,ownProps) {
//     const order = state.orders;
//     const menus = state.menus;
//     return {
//         order: order,
//         menus: menus
//     };
// }

// export function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(menuAction, dispatch)
//         // orderAction: bindActionCreators(orderAction, dispatch)
//     };
// }



// export default connect(mapStateToProps, mapDispatchToProps)(BillBox);



const BillBox = ({dataOrder,hideButton, yesClick, noClick}) => {
    
        return(
            <div className="bill-modal-box border">
                    <div className="bill-modal-text">
                    <h1>Yam Nyam!</h1>
                    <h2>Dijamin Yummy!</h2>
                    <p>Jl. Pegangsaan timur No. 45, Jakarta Pusat, DKI Jakarta, Telepon: 085721479846</p>
                    <p>-----------------------------------------------------</p>
                    <p> Customer : {dataOrder.name} </p>
                    <p> Cashier :  {dataOrder.cashierIdentity} </p>
                    <p> Date    : {dataOrder.currentDate} </p>
                </div>
                <div>
                    <div >
                        <div className="bill-modal-text">
                            
                            
                            {dataOrder.orderList.map(data =>
                             <OrderList key={data.id} data={data}
                            />)}
    
                            <p className="total-amount">Total: Rp {dataOrder.totalAmount} </p>
                        </div>
                        <div className={hideButton}>
                            <button className="btn btn-primary" onClick={yesClick}>Print & Confirm</button>
                            <button className="btn btn-danger" onClick={noClick}>Cancel</button> 
    
    
                        </div>
                    </div>
                    
                </div>
                </div>
                
            
        );

    };
    


export default BillBox;
