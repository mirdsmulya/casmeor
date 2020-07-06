


let menu = [
    {
        image: "AyamTaliwang",
        name: "Ayam Taliwang Bakar",
        description: "Nasi, ayam taliwang",
        price: 32000,
        quantity: 0,
        id: "qwqwe"
    },
    {
        image: "AyamBali",
        name: "Ayam Bumbu Bali",
        description: "Nasi, ayam bumbu bali, sambel, tahu dan tempe",
        price: 40000,
        quantity: 0,
        id: "qwqde"
    },
    {
        image: "AyamGeprek",
        name: "Ayam Geprek",
        description: "Nasi, ayam bumbu bali, sambel, tahu dan tempe aaaaaaaaaaaaa",
        price: 15000,
        quantity: 0,
        id: "qfqwe"
    },
    {
        image: "AyamKremes",
        name: "Ayam Kremes Medan",
        description: "Nasi, ayam bumbu bali, sambel, tahu dan tempe",
        price: 17000,
        quantity: 0,
        id: "qwvwe"
    }

];


class MenuApi {
    
    static getAllMenu() {
        return new Promise((resolve, reject) => {
            const urlFetch = fetch(process.env.BACKEND_IP+'menu');
            urlFetch.then( res => {
                if (res.status == 200) {return res.json(); }

            }).then( result => resolve(result));

        });
    }
    static deleteMenu(name) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let dataIndex = menu.findIndex(a => a.name == name);
                menu.splice(dataIndex, 1);
                resolve(Object.assign([],menu));
            },0);
        });

    }

    static saveMenu(newMenu) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                menu = [newMenu, ...menu];
                resolve(Object.assign([],menu));
            },0);
        });

    }
    static updateMenuOrder(menuOrders) {
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                let updateMenu = Object.assign([], menu);
                for (let i = 0; i < menuOrders.length; i++) {
                    let menuOrder = menuOrders[i];
                    let menuIndex = updateMenu.findIndex(a => a.name == menuOrder.name);
                    updateMenu.splice(menuIndex,1, menuOrder);    
                }
                resolve(Object.assign([], updateMenu));

            },0);
        });
    }


}
export default MenuApi; 