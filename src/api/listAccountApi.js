
import passwordHash from 'password-hash';


class ListAccountApi {

    static getAllAccount() {
        return new Promise((resolve, reject) => {
            const urlFetch = fetch('http://localhost:3000/account');
            urlFetch.then( res => {
                if (res.status === 200) { return res.json(); } 
            }).then(result => resolve(result.values));
        });
    }
   
    static saveAccount(newAccount) {
        return new Promise((resolve, reject) => {
            newAccount['password'] = passwordHash.generate(newAccount.password);
            const accountData = [Object.values(newAccount)];
            const postMethod = {
                method: 'POST', 
                mode: 'cors', 
                cache: 'no-cache', 
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(accountData) 
            };
            
            const urlFetch = fetch('http://localhost:3000/saveAccount', postMethod);
            urlFetch.then( res => {
                const result = res.status === 200 ? resolve(true) : resolve(false);
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
                'Content-Type': 'application/json'
                },
                body: JSON.stringify([nip]) 
            };
            
            const urlFetch = fetch('http://localhost:3000/deleteAccount', deleteMethod);
            urlFetch.then( res => {
                const result = res.status === 200 ? resolve(true) : resolve(false);
            });
        });

    }

    static checkCredentials(credentials) {
        return new Promise((resolve, reject) => {
            const urlFetch = fetch('http://localhost:3000/account');
            urlFetch.then( res => {
                if (res.status === 200) { return res.json(); } 
            }).then(result => {
                const accounts = result.values;
                const dataIndex = accounts.findIndex(account => account.username == credentials.username );
                if (dataIndex !== -1) {
                    const tempAccount = accounts[dataIndex];
                    return resolve(passwordHash.verify(credentials.password,tempAccount.password));
                }
                resolve(false);
            });  
        });
    }
}

export default ListAccountApi;
