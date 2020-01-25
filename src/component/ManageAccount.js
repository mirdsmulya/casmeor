

import React from 'react';
import TextInput from '../common/textInput';
import SelectInput from '../common/SelectInput';

const ManageAccount = ({data, onSave, onChange, options}) => {
    return(

        <div className="manage-account border">

            <h3>Account Setting</h3>
            <p>Create New Account</p>
            <TextInput 
                name="name"
                type="string"
                label="Name"
                value={data.name}
                onChange={onChange}
            
            />

            <TextInput 
                name="username"
                type="string"
                label="User Name"
                value={data.username}
                onChange={onChange}
            
            /> 

            <TextInput 
                name="nip"
                type="string"
                label="Nomor Induk Pegawai"
                value={data.nip}
                onChange={onChange}
            
            />

            <SelectInput 
                name='role'
                type="string"
                label="Role"
                value={data.role}
                onChange={onChange}
                options={options}
            />   

            <button className="btn" onClick={onSave}>Save</button> 



        </div>

    );

};
export default ManageAccount;