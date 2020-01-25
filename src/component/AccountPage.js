

import React from 'react';
import Sidebar from '../common/Sidebar';
import ManageAccount from '../component/ManageAccount';

import AccountList from '../component/AccountList';
import ListAccountApi from '../api/listAccountApi';

class AccountPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            account: [],
            newAccount: {name:"", username:"", nip:"", role:""},
            roleOptions: [{input:"Manager"}, {input:"Owner"}, {input:"Staff"}]
        };
        this.dataInputChange = this.dataInputChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        ListAccountApi.getAllAccount()
        .then(account => this.setState({account: account}) )
    }


    dataInputChange(event) {
        debugger;
        const field = event.target.name;
        let newAccount = Object.assign({}, this.state.newAccount);
        newAccount[field] = event.target.value;
        return this.setState({newAccount: newAccount});

    }

    onSave() {
        let newAccount = Object.assign({}, this.state.newAccount);
        ListAccountApi.saveAccount(newAccount)
        .then(account => this.setState({account: account}));
        debugger;
    }
    render() {
        console.log(this.state);
        debugger;
        
        return(
            <div className="main">
                <Sidebar />
                <ManageAccount 
                    data={this.state.account}
                    options={this.state.roleOptions}
                    onChange={this.dataInputChange}
                    onSave={this.onSave}
                
                />

                <AccountList accounts={this.state.account}/>

            </div>
        );
    }

}
export default AccountPage;