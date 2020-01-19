import React from 'react';
import MenuPage from '../component/menuPage';
import MenuApi from '../api/listMenuApi';

class App extends React.Component {
	constructor(props, context) {
		debugger;
		super(props,context);
		this.state = {
			menu: [],
			dataOrder: [],
            totalPrice: 0,
            display:"hide",
            button:"hide",
            newMenu: {image: "AyamKremes", name:"", description:"", price:0, quantity:0}

		};
		debugger;
        this.updateQuantity = this.updateQuantity.bind(this);
        this.showAdminMenu = this.showAdminMenu.bind(this);
        this.deleteButton = this.deleteButton.bind(this);
        this.saveButton = this.saveButton.bind(this);
        this.menuInputChange = this.menuInputChange.bind(this);
	}

	componentDidMount() {
		
		MenuApi.getAllMenu().then( (menu) => {
			this.setState({menu: menu});
		});
			
		
		debugger;
	}

	updateQuantity(event, operation) {
		const field = event.target.name;
		let menu = Object.assign([], this.state.menu);
		let result;
		if (operation == "plus") {
			result = this.quantityOperation(menu,field, 1);
		} else {
			result = this.quantityOperation(menu,field, -1);
		}
		this.setState([], Object.assign({menu: result}));
		debugger;
		
	}

	quantityOperation(menu,field, operator) {
		let dataIndex = menu.findIndex(a => a.name == field);
		let newData = menu[dataIndex];
		let tempQuantity = newData['quantity'];
		newData['quantity'] = newData['quantity'] + operator;

		if (newData['quantity'] < 0) {
			newData['quantity'] = 0;
		}
		
		this.addToOrderList(field, tempQuantity, newData);
		menu.splice(dataIndex,1,newData);
		let cal = () => this.calculateTotalPrice();
		this.calculateTotalPrice();
		let total = this.state.dataOrder
		debugger;
		return menu;
	}

	addToOrderList(field, tempQuantity, newData) {
		let dataOrder = Object.assign([], this.state.dataOrder);
		let dataIndex =	dataOrder.findIndex(a => a.name == field );
		debugger;
		if ( dataIndex < 0) {
			if (tempQuantity == 0 && newData['quantity'] == 1){
				dataOrder.splice(0,0, newData);
				this.setState({dataOrder: dataOrder});			
			}

		} else {
			if (tempQuantity > 1) {
				dataOrder.splice(dataIndex,1, newData);
				this.setState({dataOrder: dataOrder});
			}
			if (tempQuantity == 1 && newData['quantity'] == 0) {
				dataOrder.splice(dataIndex,1);
				this.setState({dataOrder: dataOrder});
			}
		}
	}

	calculateTotalPrice() {
		setTimeout( () => {
			let dataOrder = Object.assign([], this.state.dataOrder);
			let lengthOrder = dataOrder.length;
			let totalPrice =0;
			for (let i=0; i < lengthOrder; i++) {
				let menu = dataOrder[i];
				let totalOneMenu = menu['quantity'] * menu['price']
				totalPrice = totalPrice + totalOneMenu;	
			}
			this.setState({totalPrice: totalPrice});
			debugger;

		},0);
		
		debugger;
    }
    
    showAdminMenu(event) {
        
        let button = event.target.name;
        if (button == "admin") {
            this.setState({display: "menu-box-input"});
            this.setState({button:"btn btn-danger delete-button"});
            return button
        }
        this.setState({display: "hide"});
        this.setState({button:"hide"});
        debugger;
    }

    deleteButton(event) {
        const field = event.target.name;
        MenuApi.deleteMenu(field).then( (menu) => {
            this.setState({menu: menu});
            debugger;
            
        });
        debugger;
    }

    saveButton() {
        let newMenu = Object.assign({}, this.state.newMenu);
        MenuApi.saveMenu(newMenu).then( (newMenu) => {
            this.setState({menu: newMenu});
            debugger;
        });
        debugger;


    }

    menuInputChange(event) {
        const field = event.target.name;
        let newMenu = Object.assign({}, this.state.newMenu)
        newMenu[field] = event.target.value;
        return this.setState({newMenu: newMenu});

    }

	render() {
		debugger;
		console.log("From render",this.state.menu);
		console.log("dataOrderState", this.state.dataOrder);
        console.log("totalAmount", this.state.totalPrice);
        console.log(this.state.display);
        
		
		
		
		return(
			<MenuPage 
				menu={this.state.menu}
				onClick={this.updateQuantity} 	
				dataOrder={this.state.dataOrder}
                totalPrice={this.state.totalPrice}
                display={this.state.display}
                hideAction={this.showAdminMenu}
                hideButton={this.state.button}
                deleteButton={this.deleteButton}
                onChange={this.menuInputChange}
                newMenu={this.state.newMenu}
                saveButton={this.saveButton}
			/>

			);
	}
}

export default App;