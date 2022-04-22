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



Storage.load(arrayCart, Cart);
console.log(arrayCart);


for (let product of arrayCart){
    loadProductActif(product.id).then(showValue).catch(displayError);
    console.log(product.id);

    function showValue(value){
        console.log(value.price);
           document.getElementById("cart__items").innerHTML += `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                                                                    <div class="cart__item__img">
                                                                        <img src="${value.imageUrl}" alt="Photographie d'un canapé">
                                                                    </div>
                                                                    <div class="cart__item__content">
                                                                        <div class="cart__item__content__description">
                                                                        <h2>${value.name}</h2>
                                                                        <p>${product.color}</p>
                                                                        <p>${value.price * product.value} €</p>
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
    };
};





function displayError(){
    document.getElementById("cart__items").innerHTML = "<p>Item non chargé, veuillez vérifier la connexion du serveur de l'api</p>"
  };
  

async function loadProductActif(idProductActif){
    return (await fetch("http://localhost:3000/api/products/" + idProductActif)).json();
};







let total = 0;
function calculTotal(){
    for(let i of arrayCart){
        total += i.value;
    };
};
calculTotal();
console.log(total);

function displayNumberArticleAndTotal(){
    document.getElementById("totalPrice").innerHTML = total;
    document.getElementById("totalQuantity").innerHTML = arrayCart.length;
};

displayNumberArticleAndTotal();


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



    let positionOfProductInArray = 0;

    for (let a = 0; a<arrayCart.length; a++){
        if (arrayCart[a].key === cartKey){
          positionOfProductInArray = a;
          console.log(positionOfProductInArray);
        };
    };



    let newProduct = new Cart (cartKey, cartQuantity, cartId, cartColor);
    arrayCart.splice(positionOfProductInArray, 1, newProduct);
    

    Storage.save("arrayCart", arrayCart);
  };


