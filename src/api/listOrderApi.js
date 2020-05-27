import Toastr from 'toastr';

class OrderApi {
    static getAllOrder() {
        return new Promise((resolve, reject) => {
            const urlFetch = fetch('http://localhost:3000/orders');
            urlFetch.then( res => {
                if (res.status === 200) { return res.json(); } else {Toastr.error('Failed load data')}
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
                } else {Toastr.error('Failed update data');}
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

    static deleteOrder(orderId, orders) {
        return new Promise((resolve, reject) => {
            const deleteMethod = {
                method: 'DELETE', 
                mode: 'cors', 
                cache: 'no-cache', 
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify([orderId]) 
            };
            const urlFetch = fetch('http://localhost:3000/deleteOrder', deleteMethod);
            urlFetch.then( res => {
                if (res.status === 200) {
                    const dataIndex = orders.findIndex( (order) => order.id == orderId);
                    orders.splice(dataIndex, 1);
                    Toastr.success('Delete order success');
                    resolve(orders);

                } Toastr.error('Delete order failed')
            });
        });

    }
}

export default OrderApi;