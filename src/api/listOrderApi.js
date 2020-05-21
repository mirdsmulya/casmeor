
let orderHistory = [
    {
        cashierIdentity: "mirdsm", 
        currentDate: "4/2/2020 ",
        id: "123123",
        name: "Caca",
        orderNumber: 0, 
        paymentStatus: "Unpaid",
        tableNumber: "6",
        timeOrder: "",
        totalAmount: 20000,
        orderList: []
    }
];


class OrderApi {
    static getAllOrder() {
        return new Promise((resolve, reject) => {
            const urlFetch = fetch('http://localhost:3000/orders');
            urlFetch.then( res => {
                if (res.status === 200) { return res.json(); } 
            }).then(result => resolve(result.values));
        });
        
    }

    static saveOrder(newOrder, currentOrder) {
        return new Promise((resolve, reject) => {            
            const postMethod = {
                method: 'POST', 
                mode: 'cors', 
                cache: 'no-cache', 
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(newOrder) 
            };
            
            const urlFetch = fetch('http://localhost:3000/saveOrder', postMethod);
            urlFetch.then( res => {
                const result = res.status === 200 ? resolve([...currentOrder, newOrder]) : resolve(currentOrder);
            });
        });
    }

    static getAllHistoryOrder() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], orderHistory));
            },0);
        });
    }

    static saveOrderHistory(newOrder) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                orderHistory = [...orderHistory, newOrder];
                resolve(Object.assign([], orderHistory));
            },0);
        });
    }

    static updateOrder(updatedOrder, orders) {
        return new Promise((resolve, reject) => {
            const putMethod = {
                method: 'PUT', 
                mode: 'cors', 
                cache: 'no-cache', 
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedOrder) 
            };
            
            const urlFetch = fetch('http://localhost:3000/updateOrder', putMethod);
            urlFetch.then( res => {
                if (res.status === 200) {
                    let orderIndex = orders.findIndex((a) => a.id == updatedOrder.id);
                    orders.splice(orderIndex, 1, updatedOrder);
                    resolve(Object.assign([], orders));   
                }
            });
        });
        
    }

    static getItemMenu() {
        return new Promise((resolve, reject) => {
            const urlFetch = fetch('http://localhost:3000/getItemOrder');
            urlFetch.then( res => {
                if (res.status === 200) { return res.json(); }
            })
            .then( result => {
                resolve(result.values); });
        });
    }
}

export default OrderApi;