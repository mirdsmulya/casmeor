import React from 'react';


const AccountInfo = ({account, delAccount}) => {
    return(
        <tr>
            <td>{account.name}</td>
            <td>{account.username}</td>
            <td>{account.nip}</td>
            <td>{account.role}</td>
            <td><button onClick={delAccount} id={account.nip}>Delete</button></td>
        </tr>         
    );
};
export default AccountInfo;