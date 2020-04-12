import React from 'react';

const ConfirmModal = ({modalStatement, yesClick, noClick, showModal}) => {
    return(
        <div className={showModal}>
            <section className="modal-box border">
            <div className="modal-statement ">
                <p className="modal-text ">{modalStatement}</p>
            </div>
            <div className="button-modal">
                <button className="btn btn-primary" onClick={yesClick}>Yes</button>
                <button className="btn btn-danger" onClick={noClick}>Cancel</button>
            </div>        
            </section>
        </div>
    );
};

export default ConfirmModal;