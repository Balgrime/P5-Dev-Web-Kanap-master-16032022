import { Storage } from "./storage.js";


let arrayCart = [];

class Cart {
    /**
   * Classe permettant de créer un objet pour chaque canapé ayant un modèle ou une couleur différents.
   * @param {string} key correspond à l'id + couleur du canapé
   * @param {number} value la quantité de canapés
   * @param {string} id l'id du canapé
   * @param {string} color la couleur du canapé
   */
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

/**
 * Pour chaque produit compris dans le tableau, on requête le produit de l'api via son id correspondante,
 * puis on affiche ses informations sur la page.
 */
for (let product of arrayCart){
    loadProductActif(product.id).then(function(value){
        showValue(value, product);

    }).catch(displayError);
    console.log(product.id);
};

/**
 * On affiche les informations en puisant à la fois sur l'api et également dans le tableau de produits.
 * @param {Object} value on extraie le prix, le nom, l'image du canapé depuis l'api
 * @param {Object} product on récupère la couleur et la quantité du produit dans le tableau créé
 */
function showValue(value, product){
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


/**
 * Fonction qui signale lorsque la promesse n'a pas pu être tenue.
 */
function displayError(error){
    console.log(error);
    document.getElementById("cart__items").innerHTML = "<p>Item non chargé, veuillez vérifier la connexion du serveur de l'api</p>"
};
  

/**
 * Requête les informations du produit actif de l'api.
 * @returns l'objet actif contenu dans l'api.
 */
async function loadProductActif(idProductActif){
    return (await fetch("http://localhost:3000/api/products/" + idProductActif)).json();
};



/**
 * Délégation d'événements : 
 * lorsqu'un changement de valeur est détecté au niveau de la balise avec id cart__items, la fonction de changement de quantités se déclenche,
 * idem lorsqu'un clic est détecté dans cette balise, la fonction qui retire un produit se déclenche.
 */
let idCartItems = document.getElementById("cart__items");
idCartItems.addEventListener("change", changeQuantityOfItem);
idCartItems.addEventListener("click", removeOneProduct);




/**
 * Calcule le prix d'un modèle de canapé.
 * @param {Object} value l'objet récupéré de l'api
 * @param {number} cartQuantity la quantité présente dans le tableau
 * @param {string} cartKey la clef du canapé dans le tableau
 * @param {number} newPrice le nouveau prix à calculer
 */
function calcPrice(value, cartQuantity, cartKey, newPrice){
    newPrice = value.price * cartQuantity;
    document.getElementById("price" + cartKey).innerHTML = newPrice;
};



/**
 * Fonction qui change dynamiquement la quantité d'un canapé, qui calcule son nouveau prix, 
 * ainsi que le nouveau total et prix global, puis remplace le canapé correspondant dans le tableau
 * et enfin le sauvegarde dans le localStorage.
 * @param {*} e
 */
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
        loadProductActif(cartId).then(function(value){
            calcPrice(value, cartQuantity, cartKey, newPrice)});
        };

            loadProductActif(arrayCart[a].id).then(displayNewTotal);

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
  };




/**
 * Fonction qui enlève un produit après que l'utilisateur ai cliqué sur le bouton 'supprimer' :
 * la fonction fait d'abord le tour du tableau jusqu'à trouver le canapé correspondant, puis l'enlève du tableau,
 * puis, après avoir supprimé les anciennes infos des articles de la page,
 * elle réaffiche les nouvelles données (moins l'élément supprimé) grâce à l'api et au tableau.
 * @param {*} e
 */
function removeOneProduct(e){
    if (e.target.classList.contains('deleteItem')){
        console.log("une value a été removed");


        let cartKey = e.target.dataset.key;
        console.log(cartKey);
        let cartId = e.target.dataset.id;
        console.log(cartId);



        let positionOfProductInArray = 0;
        let newTotal = 0;
        let newNumberItems = 0;
        document.getElementById("cart__items").innerHTML = "";



        for (let a = 0; a<arrayCart.length; a++){
            if (arrayCart[a].key === cartKey){
            positionOfProductInArray = a;
            console.log(positionOfProductInArray);
            arrayCart.splice(positionOfProductInArray, 1);
            Storage.save("arrayCart", arrayCart);    
            };
        };


        for (let a = 0; a<arrayCart.length; a++){
               loadProductActif(arrayCart[a].id).then(displayNewTotal);

                function displayNewTotal(value){
                    newTotal += value.price * arrayCart[a].value;
                    console.log(newTotal);
                    newNumberItems += arrayCart[a].value;
                    document.getElementById("totalPrice").innerHTML = newTotal;
                    document.getElementById("totalQuantity").innerHTML = newNumberItems;

                    document.getElementById("cart__items").innerHTML += `<article class="cart__item" data-id="${arrayCart[a].id}" data-color="${arrayCart[a].color}">
                                                                    <div class="cart__item__img">
                                                                        <img src="${value.imageUrl}" alt="Photographie d'un canapé">
                                                                    </div>
                                                                    <div class="cart__item__content">
                                                                        <div class="cart__item__content__description">
                                                                        <h2>${value.name}</h2>
                                                                        <p>${arrayCart[a].color}</p>
                                                                        <p id='price${arrayCart[a].id}${arrayCart[a].color}' >${value.price * arrayCart[a].value} €</p>
                                                                        </div>
                                                                        <div class="cart__item__content__settings">
                                                                        <div class="cart__item__content__settings__quantity">
                                                                            <p>Qté : </p>
                                                                            <input data-key= '${arrayCart[a].id}${arrayCart[a].color}' data-id= '${arrayCart[a].id}' data-color= '${arrayCart[a].color}' type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${arrayCart[a].value}">
                                                                        </div>
                                                                        <div class="cart__item__content__settings__delete">
                                                                            <p data-key= '${arrayCart[a].id}${arrayCart[a].color}' data-id= '${arrayCart[a].id}' data-color= '${arrayCart[a].color}' class="deleteItem">Supprimer</p>
                                                                        </div>
                                                                        </div>
                                                                    </div>
                                                                    </article>`
                };
        };
    };
    if (arrayCart.length == 0){
        document.getElementById("totalPrice").innerHTML = "";
        document.getElementById("totalQuantity").innerHTML = "";
    };
};






let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");
let form = document.getElementsByClassName("cart__order__form")[0];

let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
//let addressErrorMsg = document.getElementById("addressErrorMsg");
let cityErrorMsg = document.getElementById("cityErrorMsg");
let emailErrorMsg = document.getElementById("emailErrorMsg");




/**
 * Lorsqu'on clique sur le bouton submit, si tous les champs du formulaire sont bien remplis 
 * et que le panier n'est pas vide, alors on lance la requête POST.
 */
form.addEventListener("submit", (e) =>{
    console.log("c'est bien cliqué!");
    e.preventDefault();
    let productsID = [];
    createProductsID(productsID);
    if (emailErrorMsg.innerHTML == "" && firstNameErrorMsg.innerHTML == "" && lastNameErrorMsg.innerHTML == "" && cityErrorMsg.innerHTML == "" && productsID.length > 0){
        let order = {
            contact : {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            },
            products: productsID,
        } 
        console.log(order);

        sendPostRequest(order).then(showPost).then(getOrderId).catch(displayErrorPost);
    };
});


/**
 * Fonction qui vérifie la bonne conformité du champ email.
 */
function ValidateEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)){
        console.log("email valide!");
        emailErrorMsg.innerHTML = "";
    } else {
        emailErrorMsg.innerHTML = "cette adresse email n'est pas valide";
    };
};


/**
 * Fonction qui transforme la valeur du champ en string sans accent, puis vérifie qu'elle ne comprend que
 * les lettres majuscules, minuscules et tiret -
 */
function validateFirstName(){
    let str = (firstName.value).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if(/^[a-zA-Z\-]+$/.test(str)){
        console.log("firstname valide");
        firstNameErrorMsg.innerHTML = "";
    } else {
        firstNameErrorMsg.innerHTML = "Le prénom ne peut contenir que des lettres majuscules ou minucules allant de A à Z et le tiret -";
    };
};

/**
 * Fonction qui transforme la valeur du champ en string sans accent, puis vérifie qu'elle ne comprend que
 * les lettres majuscules, minuscules et tiret -
 */
function validateLastName(){
    let str = (lastName.value).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if(/^[a-zA-Z\-]+$/.test(str)){
        console.log("name valide");
        lastNameErrorMsg.innerHTML = "";
    } else {
        lastNameErrorMsg.innerHTML = "Le nom ne peut contenir que des lettres majuscules ou minucules allant de A à Z et le tiret -";
    };
};

/**
 * Fonction qui transforme la valeur du champ en string sans accent, puis vérifie qu'elle ne comprend que
 * les lettres majuscules, minuscules et tiret -
 */
function validateCity(){
    let str = (city.value).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if(/^[a-zA-Z\-]+$/.test(str)){
        console.log("city valide");
        cityErrorMsg.innerHTML = "";
    } else {
        cityErrorMsg.innerHTML = "La ville ne peut contenir que des lettres majuscules ou minucules allant de A à Z et le tiret -";
    };
};


email.addEventListener("change", () =>{
    ValidateEmail();
});

firstName.addEventListener("change", () =>{
    validateFirstName();
});

lastName.addEventListener("change", () =>{
    validateLastName();
});

city.addEventListener("change", () =>{
    validateCity();
});


/**
 * Fonction qui créé un tableau comprenant les ID des canapés actuellement contenus dans le tableau.
 * @param {string} productsID 
 */
function createProductsID(productsID){
    for (let a = 0; a<arrayCart.length; a++){
        productsID.push(arrayCart[a].id);
    };
    console.log(productsID);
};

/**
 * Fonction qui lance la requête POST à l'api.
 * @param {*} order 
 * @returns un objet comprenant en attributs un objet contact, les id, et un numéro de commande.
 */
async function sendPostRequest(order){
    return ( await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
        "Content-Type": "application/json",
    }
}));
};

/**
 * fonction qui applique .json 
 * @param {string} value 
 * @returns le string pris en argument auquel on a appliqué la méthode.json()
 */
function showPost(value){
    console.log(value);
    return (value.json());
};

/**
 * Fonction qui s'exécute lorsque la requête n'aboutit pas.
 * @param {*} error 
 */
function displayErrorPost(error){
    console.log(error);
};

/**
 * Fonction qui envoie vers la page confirmation et transmet dans l'URL de cette dernière : le numéro de commande.
 * @param {Object} value 
 */
function getOrderId(value){
    console.log(value.orderId);
    document.location.href = "../html/confirmation.html?orderId=" + value.orderId;
};