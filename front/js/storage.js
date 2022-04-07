


export let Storage = {
    save(key, value){
        JSON.stringify(value);
        console.log("le module est bien importé");
    },
    load(key){
        let Cart = JSON.parse(localStorage.getItem(key));
        console.log(localStorage.getItem(key));
    }
};