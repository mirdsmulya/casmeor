
let order = [];
let orderHistory = [
    {
        timeOrder: "",
        cashierIdentity: "mirdsm", 
        currentDate: "4/2/2020 ", 
        orderNumber: 0, 
        table: "6",
        name: "Caca",
        status: "Unpaid",
        totalAmount: 20000  
    }
];


class OrderApi {
    static getAllOrder() {
        debugger;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], orderHistory));
                debugger;
            },0);
        });
    }


    static saveOrder(newOrder) {
        debugger;
        //let news = Object.assign([], newOrder)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                orderHistory = [...orderHistory, newOrder];
                resolve(Object.assign([], orderHistory));
                debugger;
            },0);
        });
    }

    static getAllHistoryOrder() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], orderHistory));
                debugger;
            },0);
        });
    }

    static saveOrderHistory(newOrder) {
        debugger;

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                orderHistory = [...orderHistory, newOrder];
                resolve(Object.assign([], orderHistory));
                debugger;
            },0);
        });
    }

    static updateOrder(updatedOrder) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let orderIndex = orderHistory.findIndex((a) => a.id == updatedOrder.id);
                orderHistory.splice(orderIndex, 1, updatedOrder);
                resolve(Object.assign([], orderHistory));
            });

        });
        
    }
}

export default OrderApi;