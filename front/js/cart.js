import { Storage } from "./storage.js";


let arrayCart = [];

class Cart {
    constructor(key, value, id, color) {
        this.key = key;
        this.value = value;
        this.id = id;
        this.color = color;
    }
  };



let total = 0;
let numberItems = 0;

Storage.load(arrayCart, Cart);
console.log(arrayCart);


for (let product of arrayCart){
    loadProductActif(product.id).then(showValue).catch(displayError);
    console.log(product.id);

    function showValue(value){
        console.log(value.price);
        total += value.price * product.value;
        console.log(total);
        numberItems += product.value;
           document.getElementById("cart__items").innerHTML += `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                                                                    <div class="cart__item__img">
                                                                        <img src="${value.imageUrl}" alt="Photographie d'un canapé">
                                                                    </div>
                                                                    <div class="cart__item__content">
                                                                        <div class="cart__item__content__description">
                                                                        <h2>${value.name}</h2>
                                                                        <p>${product.color}</p>
                                                                        <p id='price${product.id}${product.color}' >${value.price * product.value} €</p>
                                                                        </div>
                                                                        <div class="cart__item__content__settings">
                                                                        <div class="cart__item__content__settings__quantity">
                                                                            <p>Qté : </p>
                                                                            <input data-key= '${product.id}${product.color}' data-id= '${product.id}' data-color= '${product.color}' type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.value}">
                                                                        </div>
                                                                        <div class="cart__item__content__settings__delete">
                                                                            <p data-key= '${product.id}${product.color}' data-id= '${product.id}' data-color= '${product.color}' class="deleteItem">Supprimer</p>
                                                                        </div>
                                                                        </div>
                                                                    </div>
                                                                    </article>`

            document.getElementById("totalPrice").innerHTML = total;
            document.getElementById("totalQuantity").innerHTML = numberItems;
    };
};





function displayError(){
    document.getElementById("cart__items").innerHTML = "<p>Item non chargé, veuillez vérifier la connexion du serveur de l'api</p>"
  };
  

async function loadProductActif(idProductActif){
    return (await fetch("http://localhost:3000/api/products/" + idProductActif)).json();
};



/*for(let a=0; a<arrayCart.length;a++){
    let classQuantity = document.getElementsByClassName("itemQuantity")[a];
    let activQuantity = parseInt(classQuantity.value);
    console.log(activQuantity);
};*/


let idCartItems = document.getElementById("cart__items");
idCartItems.addEventListener("change", changeQuantityOfItem);


   /*for(let a=0; a<arrayCart.length;a++){
        console.log("une valeur a changée!");
        let classQuantity = document.getElementsByClassName("itemQuantity")[a];
        let activQuantity = parseInt(classQuantity.value);
        console.log(activQuantity);
        changeQuantityOfItemInArrayCart(arrayCart[a].id, arrayCart[a].color, activQuantity, a);
    };
    };
    console.log(arrayCart);
    Storage.save("arrayCart", arrayCart);
});*/




function changeQuantityOfItem(e){
        console.log("une value a changée");


    let cartKey = e.target.dataset.key;
    console.log(cartKey);
    let cartQuantity = parseInt(e.target.value);
    console.log(cartQuantity);
    let cartId = e.target.dataset.id;
    console.log(cartId);
    let cartColor = e.target.dataset.color;
    console.log(cartColor);


    

    let newPrice = 0;
    let positionOfProductInArray = 0;
    
    let newTotal = 0;
    let newNumberItems = 0;

    for (let a = 0; a<arrayCart.length; a++){
        if (arrayCart[a].key === cartKey){
          positionOfProductInArray = a;
          console.log(positionOfProductInArray);
        loadProductActif(cartId).then(calcPrice);


            function calcPrice(value){
                newPrice = value.price * cartQuantity;
                document.getElementById("price" + cartKey).innerHTML = newPrice;
            };
        };

            loadProductActif(cartId).then(displayNewTotal);

            function displayNewTotal(value){
                newTotal += value.price * arrayCart[a].value;
                console.log(total);
                newNumberItems += arrayCart[a].value;
                document.getElementById("totalPrice").innerHTML = newTotal;
                document.getElementById("totalQuantity").innerHTML = newNumberItems;

            };
    };

    let newProduct = new Cart (cartKey, cartQuantity, cartId, cartColor);
    arrayCart.splice(positionOfProductInArray, 1, newProduct);
    

    Storage.save("arrayCart", arrayCart);


    /*let newTotal = 0;
    let newNumberItems = 0;

    for(let product of arrayCart){
        newTotal += product.price * product.value;
        console.log(total);
        newNumberItems += product.value;
        document.getElementById("totalPrice").innerHTML = newTotal;
        document.getElementById("totalQuantity").innerHTML = newNumberItems;
    };*/
  };