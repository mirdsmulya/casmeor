import Toastr from 'toastr';

class OrderApi {
    static getAllOrder() {
        return new Promise((resolve, reject) => {
            const urlFetch = fetch(process.env.BACKEND_IP+'order');
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
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('access_token') 
                },
                body: JSON.stringify(newOrder) 
            };
            
            const urlFetch = fetch(process.env.BACKEND_IP+'order', postMethod);
            urlFetch.then( res => {
                if (res.status == 201 ) {
                    Toastr.success("Order saved!");
                    resolve([...currentOrder, newOrder]);
                } else {
                    Toastr.error("Order not saved");
                    resolve(currentOrder);}
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
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('access_token')
                },
                body: JSON.stringify(updatedOrder) 
            };
            const urlFetch = fetch(process.env.BACKEND_IP+'order/'+ prevId, putMethod);
            urlFetch.then( res => {
                if (res.status === 200) {
                    let orderIndex = orders.findIndex((a) => a.id == prevId);
                    orders.splice(orderIndex, 1, updatedOrder);
                    if (updatedOrder.paymentStatus != "PAID" ) {Toastr.success("Order Updated!");}
                    else { Toastr.success('Payment from '+ updatedOrder.name +' accepted!'); }
                    resolve(Object.assign([], orders));   
                } else {Toastr.error('Failed update data');}
            });
        });   
    }

    static getItemMenu(id) {
        return new Promise((resolve, reject) => {
            const urlFetch = fetch(process.env.BACKEND_IP+'order/'+ id);
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
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('access_token') 

                }
            };
            const urlFetch = fetch(process.env.BACKEND_IP+'order/'+ orderId, deleteMethod);
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