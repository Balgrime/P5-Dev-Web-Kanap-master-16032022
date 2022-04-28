/**
 * Permet de récupérer l'identifiant du produit actif depuis l'URL.
 */
let urlPageProduct = window.location.search;
let urlSearchParams = new URLSearchParams(urlPageProduct);
let idProductActif = urlSearchParams.get("id");



loadProductActif().then(displayData).catch(displayError);
  

/**
 * Requête les informations du produit actif de l'api.
 * @returns l'objet actif contenu dans l'api.
 */
async function loadProductActif(){
  return (await fetch("http://localhost:3000/api/products/" + idProductActif)).json();
};

/**
 * Va afficher sur la page les attributs de l'objet pris en argument.
 * @param {Object} productActif le produit sélectionné
 */
function displayData(productActif){

  document.getElementById("title").innerHTML = productActif.name;
  document.getElementsByClassName("item__img")[0].innerHTML = `<img src="${productActif.imageUrl}" alt="${productActif.altTxt}">`;

  document.getElementById("price").innerHTML = productActif.price;
  document.getElementById("description").innerHTML = productActif.description;

  
  for (let chosenColor of productActif.colors){
      document.getElementById("colors").innerHTML += `<option value="${chosenColor}">${chosenColor}</option>`
      console.log(chosenColor);
  }
};

/**
 * Fonction qui signale lorsque la promesse n'a pas pu être tenue.
 */
function displayError(){
  document.getElementById("title").innerHTML = "<p>Item non chargé, veuillez vérifier la connexion du serveur de l'api</p>"
};








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



/**
 * Crée un nouvel objet lorsqu'on veut ajouter un canapé et l'ajoute au tableau arrayCart.
 * @param {string} id l'identifiant du canapé actif
 * @param {string} color la couleur choisie
 * @param {number} qty la quantité choisie
 */
function addProductToArray(id, color, qty) {
  let cart = new Cart(id + color, qty, id, color);

  if(qty !== 0 && color !== ""){
    arrayCart.push(cart);
    console.log(arrayCart);
  };
};


/**
 * Modifie la quantité d'un canapé lorsque celui-ci est déjà présent dans le tableau.
 * @param {string} id l'identifiant du canapé
 * @param {string} color la couleur choisie
 * @param {number} chosenQuantity la quantité choisie
 * @param {number} quantityAlreadyThere la quantité qui était déjà présente dans le tableau
 * @param {number} position la position à laquelle se situe le canapé déjà présent dans le tableau
 */
function changeQuantityOfProduct(id, color, chosenQuantity, quantityAlreadyThere, position){
  if(chosenQuantity !== 0 && color !== ""){
    let newQuantity = quantityAlreadyThere + chosenQuantity;
    let newProduct = new Cart (id + color, newQuantity, id, color);
    arrayCart.splice(position, 1, newProduct);
  };
};


/**
 * Vérifie si un canapé est déjà présent dans le tableau.
 * @param {string} id l'id du canapé
 * @param {string} color la couleur du canapé
 * @returns true si le même canapé est déjà présent
 */
function checkProduct(id, color){
  for (let a = 0; a<arrayCart.length; a++){
    console.log(arrayCart[a].key);
    if (arrayCart[a].key === (id + color)){
      return true;
    };
  };
};


Storage.load(arrayCart, Cart);
console.log(arrayCart);


let addToCart = document.getElementById("addToCart");

/**
 * Au clic sur le bouton 'addToCart', une fonction anonyme va :
 * vérifier la couleur et la quantité actuellement choisies pour le canapé,
 * scruter le tableau de canapés pour voir si ce dernier est là, et connaitre sa position et quantité déjà présente,
 * s'il n'est pas là, il l'ajoute au tableau puis sauvegarde dans le localStorage,
 * s'il est déjà là, il modifie l'élément présent puis sauvegarde dans le localStorage.
 */
addToCart.addEventListener("click", function(){

  let idColor = document.getElementById("colors");
  let pickedColor = idColor.value;
  
  let idQuantity = document.getElementById("quantity");
  let chosenQuantity = parseInt(idQuantity.value);

  let positionOfProductInArray = 0;
  let valueProductAlreadyThere = 0;

  for (let a = 0; a<arrayCart.length; a++){
    if (arrayCart[a].key === (idProductActif + pickedColor)){
      positionOfProductInArray = a;
      console.log(positionOfProductInArray);
      valueProductAlreadyThere = arrayCart[a].value;
      console.log(valueProductAlreadyThere);
      };
  };


  if (checkProduct(idProductActif, pickedColor) !== true){
    console.log("le produit n'est pas encore là");
    addProductToArray(idProductActif, pickedColor, chosenQuantity);
    Storage.save("arrayCart", arrayCart);
  } else {
    console.log("le produit est déjà là");
    changeQuantityOfProduct(idProductActif, pickedColor, chosenQuantity, valueProductAlreadyThere, positionOfProductInArray);
    Storage.save("arrayCart", arrayCart);
  };
  console.log(arrayCart);
});