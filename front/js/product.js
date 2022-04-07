let urlPageProduct = window.location.search;

let urlSearchParams = new URLSearchParams(urlPageProduct);
let idProductActif = urlSearchParams.get("id");




/*document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadProductActif();
  } catch {
    document.getElementById("title").innerHTML = "<p>Item non chargé, veuillez vérifier la connexion du serveur de l'api</p>"
  }
});*/


loadProductActif().then(displayData).catch(displayError);
  

async function loadProductActif(){
  return (await fetch("http://localhost:3000/api/products/" + idProductActif)).json();
};


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

function displayError(){
  document.getElementById("title").innerHTML = "<p>Item non chargé, veuillez vérifier la connexion du serveur de l'api</p>"
};








import { Storage } from "./storage.js";
Storage.save();
Storage.load();


class Cart {
  constructor(key, value) {
      this.key = key;
      this.value = value;
  }
};

let arrayCart = [];







function addProductToCart(id, color, qty) {
  let cart = new Cart(id + color, qty);
  arrayCart.push(cart);
  console.log(arrayCart);
};

let productAlreadyThere = false;
function checkProduct(id, color){
  for (let a = 0; a<arrayCart.length; a++){
    console.log(arrayCart[a].key);
    if (arrayCart[a].key === (id + color)){
      productAlreadyThere = true;
      console.log("le produit y est déjà");
    };
  };
};


addToCart.addEventListener("click", function(){
  let idColor = document.getElementById("colors");
  let pickedColor = idColor.value;
  

  checkProduct(idProductActif, pickedColor);
  if (productAlreadyThere == false){
    addProductToCart(idProductActif, pickedColor, 6);
  };

  console.log(arrayCart);
  console.log(productAlreadyThere);
});
















/*function addElementToLocalStorageWhenNotAlreadyThere(quantity, color, id, elementLinear){
  if(quantity !== 0 && color !== ""){
    localStorage.setItem(id + color, elementLinear);
  };
};

let addToCart = document.getElementById("addToCart");

addToCart.addEventListener("click", function(){

  
let elementAlreadyThere = false;


let idQuantity = document.getElementById("quantity");
let chosenQuantity = parseInt(idQuantity.value);
console.log(chosenQuantity);

let idColor = document.getElementById("colors");
let pickedColor = idColor.value;
console.log(pickedColor);

let elementJson = {
  id : idProductActif,
  quantity : chosenQuantity,
  color : pickedColor
}
let elementLinear = JSON.stringify(elementJson);

function checkElement(){
  for(let a = 0; a < localStorage.length; a++){
    if (localStorage.key(a).indexOf(idProductActif) !== -1 && localStorage.key(a).indexOf(pickedColor) !== -1){
      elementAlreadyThere = true;
      console.log(elementAlreadyThere);
    };
    console.log(elementAlreadyThere);
    console.log(localStorage.key(a));
  };
};

let elementJsonAlreadyInBasket = {};
function changeStringInLocalToJson(){
  let elementLinearAlreadyInBasket = localStorage.getItem(idProductActif + pickedColor);
  elementJsonAlreadyInBasket = JSON.parse(elementLinearAlreadyInBasket);
  console.log(elementJsonAlreadyInBasket);
};

let newQuantityInBasket = 0;
function changeQuantityWhenAlreadyThere(){
  let quantityAlreadyInBasket = parseInt(elementJsonAlreadyInBasket.quantity);
  console.log(quantityAlreadyInBasket);
  newQuantityInBasket = quantityAlreadyInBasket + chosenQuantity;
  console.log(newQuantityInBasket);
};

function replaceElementWithNewQuantity(){
  let replacementElementJson = {
    id : idProductActif,
    quantity : newQuantityInBasket,
    color : pickedColor
  }
  let replacementElementLinear = JSON.stringify(replacementElementJson);
  if(chosenQuantity !== 0 && pickedColor !== ""){
  localStorage.setItem(idProductActif + pickedColor, replacementElementLinear);
  };
};

  checkElement();

  if(elementAlreadyThere == false){
    addElementToLocalStorageWhenNotAlreadyThere(chosenQuantity, pickedColor, idProductActif, elementLinear);
  } else {
    changeStringInLocalToJson();
    changeQuantityWhenAlreadyThere();
    replaceElementWithNewQuantity();
  }
  console.log(chosenQuantity);
  console.log(pickedColor);
});



/*fetch("http://localhost:3000/api/products/" + idProductActif)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(objectActif) {
    console.log(objectActif);
    //let objectActif = value.find(element => element._id === idProductActif);
    console.log(objectActif);
    document.getElementById("title").innerHTML = objectActif.name;
    let imgCanapé = document.getElementsByClassName("item__img");
    imgCanapé[0].innerHTML = `<img src="${objectActif.imageUrl}" alt="${objectActif.altTxt}">`;

    document.getElementById("price").innerHTML = objectActif.price;
    document.getElementById("description").innerHTML = objectActif.description;

    for (let chosenColor of objectActif.colors){
        document.getElementById("colors").innerHTML += `<option value="${chosenColor}">${chosenColor}</option>`
        console.log(chosenColor);
    }
  })
  .catch(function(err) {
    document.getElementById("title").innerHTML = "<p>Item non chargé, veuillez vérifier la connexion du serveur de l'api</p>"
    // Une erreur est survenue
});*/