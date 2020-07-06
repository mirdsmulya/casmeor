import React, { useRef, useEffect } from 'react';
import ReactToPrint from 'react-to-print';
import BillBox from './BillBox';



const BillPage = ({dataOrder, hideBillModals, hideButton, yesClick, noClick}) => {

    return(
        <div className={hideBillModals}>

             <ReactToPrint
                trigger={() => <button className="btn btn-primary">Print this out!</button>}
                content={() => this.componentRef}
                
            />
            <BillBox 
                dataOrder={dataOrder}
                hideButton={hideButton}
                yesClick={yesClick}
                noClick={noClick}
               
                
            />
            
        </div>

    );
};
export default BillPage;


