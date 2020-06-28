import Toastr from 'toastr';

class OrderApi {
    static getAllOrder() {
        return new Promise((resolve, reject) => {
            const urlFetch = fetch('http://localhost:3000/order');
            urlFetch.then( res => {
                if (res.status === 200) { return res.json(); } else {Toastr.error('Failed load data');}
            }).then(result => resolve(result));
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
            
            const urlFetch = fetch('http://localhost:3000/order', postMethod);
            urlFetch.then( res => {
                const result = res.status === 201 ? resolve([...currentOrder, newOrder]) : resolve(currentOrder);
            });
        });
    }

    static updateOrder(updatedOrder, pastOrders, prevId) {
        const orders = Object.assign([], pastOrders);
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
            
            const urlFetch = fetch('http://localhost:3000/order/'+ prevId, putMethod);
            urlFetch.then( res => {
                if (res.status === 200) {
                    let orderIndex = orders.findIndex((a) => a.id == prevId);
                    orders.splice(orderIndex, 1, updatedOrder);
                    Toastr.success("Order Updated!");
                    resolve(Object.assign([], orders));   
                } else {Toastr.error('Failed update data');}
            });
        });   
    }

    static getItemMenu(id) {
        return new Promise((resolve, reject) => {
            const urlFetch = fetch('http://localhost:3000/order/'+ id);
            urlFetch.then( res => {
                if (res.status === 200) { return res.json(); }
            })
            .then( result => {
                resolve(result); 
            });
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
                }
            };
            const urlFetch = fetch('http://localhost:3000/order/'+ orderId, deleteMethod);
            urlFetch.then( res => {
                if (res.status === 200) {
                    const dataIndex = orders.findIndex( (order) => order.id == orderId);
                    orders.splice(dataIndex, 1);
                    Toastr.success('Delete order success');
                    resolve(orders);
                } else {Toastr.error('Delete order failed');}
            });
        });

    }
}

export default OrderApi;