import React from 'react';
import Sidebar from '../common/Sidebar';
import LoginBox from '../component/LoginBox';
import ListAccountApi from '../api/listAccountApi';
import Toastr from 'toastr';

class LoginPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: {username:"", password:""}
        };
        this.dataInputChange = this.dataInputChange.bind(this);
        this.loginButton = this.loginButton.bind(this);
        this.enterPressed = this.enterPressed.bind(this);
    }

    dataInputChange(event) {
        const field = event.target.name;
        let user = Object.assign({}, this.state.user);
        user[field] = event.target.value;
        return this.setState({user: user});
    }

    enterPressed(event) {
		const code = event.keyCode || event.which;
		if (code === 13) { // work when hit enter
			event.preventDefault();
			this.loginButton();
        }
	}

    loginButton() {
        ListAccountApi.checkCredentials(this.state.user)
        .then(result => {
            if (!result) {
                return Toastr.error('User or password might be wrong :(');          
            }
            sessionStorage.setItem("currentUserLogin", this.state.user.username);
            Toastr.success('Login success! as ' + sessionStorage.getItem("currentUserLogin"));
            this.props.history.push('/');
        });      
    }

    render() {
        
        return(
            <div className="main login-page">              
                <Sidebar signOut="hide"/>
                <LoginBox 
                    user={this.state.user}
                    onChange={this.dataInputChange}
                    loginButton={this.loginButton}
                    onKeyPress={this.enterPressed}
                />
            </div>
        );
    }
}
export default LoginPage;
