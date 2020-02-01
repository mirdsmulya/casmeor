

import React from 'react';
import TextInput from '../common/textInput';
import SelectInput from '../common/SelectInput';

const ManageAccount = ({confirmPassword, data, onSave, onChange, options}) => {
    
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

            <TextInput 
                name="password"
                type="password"
                label="Password"
                value={data.password}
                onChange={onChange}
            
            />  

            <TextInput 
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={onChange}
            
            /> 

            <button className="btn margin-top" onClick={onSave}>Save</button> 



        </div>

    );

};
export default ManageAccount;