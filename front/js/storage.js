

export let Storage = {
    save(key, value){
       //s console.log("le module est bien importé");
        let linearValue = JSON.stringify(value);
        localStorage.setItem(key, linearValue);
    },
    load(arrayCart){
        arrayCart = JSON.parse(localStorage.getItem("arrayCart"));
        console.log("le localStorage a bien chargé");
        console.log(arrayCart);
    }
};