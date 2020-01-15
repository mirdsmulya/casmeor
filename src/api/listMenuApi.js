


let menu = [
    {
        image: "AyamTaliwang",
        name: "Ayam Taliwang Bakar",
        description: "Nasi, ayam taliwang, sambel, tahu dan tempe",
        price: 32000,
        quantity: 0
    },
    {
        image: "AyamBali",
        name: "Ayam Bumbu Bali",
        description: "Nasi, ayam bumbu bali, sambel, tahu dan tempe",
        price: 40000,
        quantity: 0
    },
    {
        image: "AyamGeprek",
        name: "Ayam Geprek",
        description: "Nasi, ayam bumbu bali, sambel, tahu dan tempe",
        price: 15000,
        quantity: 0
    },
    {
        image: "AyamKremes",
        name: "Ayam Kremes Medan",
        description: "Nasi, ayam bumbu bali, sambel, tahu dan tempe",
        price: 17000,
        quantity: 0
    }

];



class MenuApi {

    static getAllMenu() {
        debugger;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([],menu));
                debugger;
            },0);
        });
    }
}
export default MenuApi; 