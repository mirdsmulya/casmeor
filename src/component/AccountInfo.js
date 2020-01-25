import React from 'react';


const AccountInfo = ({account}) => {
    return(

        <tr>
            <td>{account.name}</td>
            <td>{account.username}</td>
            <td>{account.nip}</td>
            <td>{account.role}</td>
        </tr>
           
    );

};
export default AccountInfo;