import React from 'react';
import Sidebar from '../common/Sidebar';
import ManageAccount from '../component/ManageAccount';
import Toastr from 'toastr';
import AccountList from '../component/AccountList';
import ListAccountApi from '../api/listAccountApi';
import ConfirmModal from '../common/ConfirmModal';

class AccountPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            account: [],
            newAccount: {},
            roleOptions: [{input:"Manager"}, {input:"Owner"}, {input:"Staff"}],
            confirmPassword: "",
            showModal: "hide"
        };
        this.dataInputChange = this.dataInputChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.forwardModal = this.forwardModal.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    componentDidMount() {
        ListAccountApi.getAllAccount()
        .then(account => this.setState({account: account}) );
    }

    dataInputChange(event) {
        const field = event.target.name;
        if (field == "confirmPassword") {
            let password = event.target.value; 
            return this.setState({confirmPassword: password});
        }

        const newAccount = Object.assign({}, this.state.newAccount);
        newAccount[field] = event.target.value;
        return this.setState({newAccount: newAccount});

    }

    checkInput(obj) {
        for (let i = 0; i < obj.length; i++) {      
            if (obj[i] == ""){return true;}
        }
        return false;

    }

    forwardModal() {
        const newAccount = Object.assign({}, this.state.newAccount);
        const accounts =  Object.assign([], this.state.account);
        const Obj = Object.values(newAccount);
        this.setState({showModal: "hide"});
        
        if (Obj.length < 5 ||  this.checkInput(Obj)) {
            return Toastr.warning("All field must be filled!");
        }

        if (newAccount.password !== this.state.confirmPassword) {
            return Toastr.error("Passowrd is not match!");
        }

        if (accounts.findIndex(acc => acc.nip == newAccount.nip) >= 0) {
            return Toastr.error("Account already created!");
        }

        ListAccountApi.saveAccount(newAccount)
        .then(res => {
            if (res) {
                this.setState({ account: [...accounts, newAccount],
                                newAccount: [],
                                confirmPassword: ""
                });
                return Toastr.success("User creation success!");
            } Toastr.error("Server is busy!");
        });
    }

    closeModal() {
        this.setState({showModal: "hide"});
    }
    
    onSave() {
        this.setState({showModal: 'modals'});
    }

    deleteAccount(event) {
        const nip = event.target.id;
        const accounts = Object.assign([], this.state.account);
        const newAccounts = accounts.filter( acc => acc.nip != nip);
        ListAccountApi.deleteAccount(nip)
        .then(res => {
            if (res) {
                this.setState({account: newAccounts});
                return Toastr.success('Deleting user success!');
            } Toastr.error('Deleting user failed!');
        });
    }

    userCheck() {
        if (sessionStorage.getItem("currentUserLogin") == null ) {
            this.props.history.push('/login');
            Toastr.info("Login Required");
        }
    }
    
    render() {
        this.userCheck();
        return(
            <div className="main">
                <Sidebar props={this.props.history}/>
                <ManageAccount 
                    data={this.state.newAccount}
                    options={this.state.roleOptions}
                    onChange={this.dataInputChange}
                    onSave={this.onSave}
                    confirmPassword={this.state.confirmPassword}
                
                />
                <AccountList accounts={this.state.account} delAccount={this.deleteAccount}/>
                <ConfirmModal 
                    modalStatement="Apa kamu yakin ingin save akun ini?"
                    yesClick={this.forwardModal}
                    noClick={this.closeModal}
                    showModal={this.state.showModal}
                
                />
            </div>
        );
    }
}
export default AccountPage;