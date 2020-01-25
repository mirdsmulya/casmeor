


let account = [
    {
        name: "Mirdan Syahid",
        nip: "MSA",
        username: "mirdsm",
        role:"Owner"
        
    }
]


class ListAccountApi {
    static getAllAccount() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([],account));
                debugger;
            },0);
        });

    }


    static saveAccount(newAccount) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                account = [newAccount, ...account];
                resolve(Object.assign([],account));
                debugger;
            },0);
        });

    }

    static deleteAccount(nip) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                
                let dataIndex = account.findIndex(a => a.nip == nip);
                account.splice(dataIndex, 1);
                resolve(Object.assign([],nip));
                debugger;
            },0);
        });

    }

}

export default ListAccountApi;