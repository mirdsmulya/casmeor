import React from 'react';
import MenuPage from '../component/menuPage';
import MenuApi from '../api/listMenuApi';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Toastr from 'toastr';
import * as menuAction from '../actions/menuAction';


class AdministratorPage extends React.Component {
    constructor(props, context) {
        super(props,context);
        this.state= {
            menu: [],
            dataOrder: [],
            newMenu: {image: "AyamGeprek", name:"", description:"", price:"", quantity:0},
            display:"menu-box-input",
            button:"btn btn-danger delete-button",
            order: "hide",
            pictures: [], 
            uploadTextButton: 'Choose imagess',
            orderDetails: {name:"", table:""}
        };
        this.deleteButton = this.deleteButton.bind(this);
        this.saveButton = this.saveButton.bind(this);
        this.menuInputChange = this.menuInputChange.bind(this);
        this.pictureUpload = this.pictureUpload.bind(this);
    }

    componentDidMount() {
        MenuApi.getAllMenu().then( (menu) => {
			this.setState({menu: menu});
        });
    }

    pictureUpload(picture) {
        this.setState({uploadTextButton: 'Uploading...'});
        this.setState({pictures: picture });
        setTimeout(() => {
            if (this.state.pictures.length > 0 ) {
                this.setState({uploadTextButton: 'Uploaded!'})
            }
        }, 1500);
    }

    deleteButton(event) {
        const field = event.target.name;
        this.props.actions.deleteMenu(field);
    }

    saveButton() {
        const newMenu = Object.assign({}, this.state.newMenu);
        this.props.actions.saveMenu(newMenu);
    }

    menuInputChange(event) {
        const field = event.target.name;
        const newMenu = Object.assign({}, this.state.newMenu)
        newMenu[field] = event.target.value;
        return this.setState({newMenu: newMenu});

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
            <div>
                <MenuPage 
                menu={this.props.menus}
                dataOrder={this.state.dataOrder}
                newMenu={this.state.newMenu}
                saveButton={this.saveButton}
                onChange={this.menuInputChange}
                deleteButton={this.deleteButton}
                hideButton={this.state.button}
                display={this.state.display}
                hideOrder={this.state.order}
                upload={this.pictureUpload}
                uploadTextButton={this.state.uploadTextButton}
                orderDetails={this.state.orderDetails}
                props={this.props.history}
                
                />
            </div>
        );
    }
}


export function mapStateToProps(state) {
    return {
        menus: state.menus
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(menuAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdministratorPage);