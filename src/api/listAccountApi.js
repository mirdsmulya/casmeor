
import passwordHash from 'password-hash';


class ListAccountApi {

    static getAllAccount() {
        return new Promise((resolve, reject) => {
            const urlFetch = fetch('http://localhost:3000/account');
            urlFetch.then( res => {
                if (res.status === 200) { return res.json(); } 
            }).then(result => resolve(result));
        });
    }
   
    static saveAccount(newAccount) {
        return new Promise((resolve, reject) => {
            newAccount['password'] = passwordHash.generate(newAccount.password);
            const postMethod = {
                method: 'POST', 
                mode: 'cors', 
                cache: 'no-cache', 
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(newAccount) 
            };
            
            const urlFetch = fetch('http://localhost:3000/account', postMethod);
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
                'Content-Type': 'application/json'
                }
            };
            const urlFetch = fetch('http://localhost:3000/account/'+ nip, deleteMethod);
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
                const accounts = result;
                const dataIndex = accounts.findIndex(account => account.username == credentials.username );
                const tempAccount = accounts[dataIndex];
                if (dataIndex !== -1 && (passwordHash.verify(credentials.password,tempAccount.password))) {
                    const name = tempAccount.name.split(' ');
                    return resolve(name[0]);
                } resolve(false);
            });  
        });
    }
}

export default ListAccountApi;
