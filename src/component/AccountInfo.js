import React from 'react';


const AccountInfo = ({account, delAccount}) => {
    return(
        <tr>
            <td>{account.name}</td>
            <td>{account.username}</td>
            <td>{account.id}</td>
            <td>{account.role}</td>
            <td><button onClick={delAccount} id={account.id}>Delete</button></td>
        </tr>         
    );
};
export default AccountInfo;