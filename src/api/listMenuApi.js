


let menu = [
    {
        image: "",
        name: "Ayam Taliwang Bakar",
        description: "Nasi, ayam taliwang, sambel, tahu dan tempe",
        price: "32.000",
        quantity: "0"
    },
    {
        image: "",
        name: "Ayam Bumbu Bali",
        description: "Nasi, ayam bumbu bali, sambel, tahu dan tempe",
        price: "40.000",
        quantity: "0"
    }
];



class MenuApi {

    static getAllMenu() {
        debugger;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([],menu));
            },0);
        });
    }
}
export default MenuApi; 