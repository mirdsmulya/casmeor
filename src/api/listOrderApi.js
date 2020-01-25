
let order = [
    {
        image: "AyamTaliwang",
        name: "Ayam Taliwang Bakar",
        description: "Nasi, ayam taliwang",
        price: 32000,
        quantity: 0
    }
];



class OrderApi {
    static getAllOrder() {
        debugger;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], order));
                debugger;
            },0);
        });
    }


    static saveOrder(newOrder) {
        debugger;
        let news = Object.assign({}, newOrder)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign({}, news));
                debugger;
            },0);
        });
    }
}

export default OrderApi;