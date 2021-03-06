
import jwt from 'jwt-decode';

class ListAccountApi {

    static getAllAccount() {
        return new Promise((resolve, reject) => {
            const access_token = {
                headers: {
                    'Authorization': 'Bearer '+ localStorage.getItem('access_token') 
                }
            };
            const urlFetch = fetch(process.env.BACKEND_IP+'account', access_token);
            urlFetch.then( res => {
                if (res.status === 200) { return res.json(); } 
            }).then(result => resolve(result));
        });
    }
   
    static saveAccount(newAccount) {
        return new Promise((resolve, reject) => {
            const postMethod = {
                method: 'POST', 
                mode: 'cors', 
                cache: 'no-cache', 
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('access_token') 
                },
                body: JSON.stringify(newAccount) 
            };
            
            const urlFetch = fetch(process.env.BACKEND_IP+'account', postMethod);
            urlFetch.then( res => {
                const result = res.status === 201 ? resolve(true) : resolve(false);
            });
        });
    }

    static deleteAccount(nip) {
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
            const urlFetch = fetch(process.env.BACKEND_IP+'account/'+ nip, deleteMethod);
            urlFetch.then( res => {
                const result = res.status === 200 ? resolve(true) : resolve(false);
            });
        });

    }

    static login(credentials) {
        return new Promise((resolve, reject) => {
            const postMethod = {
                method: 'POST', 
                mode: 'cors', 
                cache: 'no-cache', 
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials) 
            };

            const urlFetch = fetch(process.env.BACKEND_IP+'auth/login', postMethod);
            urlFetch.then( res => {
                if (res.status == 201) {return res.json(); }
            }).then(result => {
                if (result) {
                    const token = result.access_token;
                    const payload = jwt(token);
                    localStorage.setItem("access_token", token);
                    localStorage.setItem("expired_time", payload.exp);
                    resolve(payload.name);
                }
                resolve(false);
                
            });

        });
    }
}

export default ListAccountApi;
