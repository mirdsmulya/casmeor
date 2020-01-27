import React from 'react';
import Sidebar from '../common/Sidebar';
import TexInput from '../common/textInput';
import MenuInput from '../component/MenuInput';
import MenuPage from '../component/menuPage';
import MenuApi from '../api/listMenuApi';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
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
            uploadTextButton: 'Choose imagess'


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
        debugger;

    }

    pictureUpload(picture) {
        
        this.setState({uploadTextButton: 'Uploading...'});
        debugger;
        this.setState({pictures: picture });
        setTimeout(() => {
            if (this.state.pictures.length > 0 ) {
                this.setState({uploadTextButton: 'Uploaded!'})
            }
        }, 1500);
        debugger;
    }

    deleteButton(event) {
        const field = event.target.name;
        this.props.actions.deleteMenu(field);
        debugger;
    }

    saveButton() {
        let newMenu = Object.assign({}, this.state.newMenu);
        this.props.actions.saveMenu(newMenu);
        debugger;


    }

    menuInputChange(event) {
        const field = event.target.name;
        let newMenu = Object.assign({}, this.state.newMenu)
        newMenu[field] = event.target.value;
        return this.setState({newMenu: newMenu});

    }


    render() {
        console.log(this.state.display);
        console.log("From render",this.state.menu);
        console.log(this.state.pictures[0]);
        
        debugger;


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
                
                />
            </div>
        );
    }
}


export function mapStateToProps(state) {
    debugger;
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

