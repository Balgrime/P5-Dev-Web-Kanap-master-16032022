

export let Storage = {
    save(key, value){
       //s console.log("le module est bien importé");
        let linearValue = JSON.stringify(value);
        localStorage.setItem(key, linearValue);
    },
    load(arrayCart, Cart){
        let objectsInLocal = JSON.parse(localStorage.getItem("arrayCart"));
        console.log(objectsInLocal);
      
        for(let key in objectsInLocal){
      
          let cart = new Cart(objectsInLocal[key].key, objectsInLocal[key].value);
        
          arrayCart.push(cart);
      
        };
      }
};