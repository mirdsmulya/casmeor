import React from 'react';
import AccountInfo from '../component/AccountInfo';

const AccountList = ({accounts, delAccount}) => {
    return(
        <div className="manage-account">
            <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>NIP</th>
                    <th>Owner</th>
                </tr>
            </thead>
            <tbody>
        {accounts.map(account =>  
                <AccountInfo key={account.id} account={account} delAccount={delAccount} />
                )}
        </tbody>
        </table>
        </div>
    );
};
export default AccountList;