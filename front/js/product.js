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




let arrayCart = [];

class Cart {
  constructor(key, value, id, color) {
      this.key = key;
      this.value = value;
      this.id = id;
      this.color = color;
  }
};





/*function load(arrayCart){
  let objectsInLocal = JSON.parse(localStorage.getItem("arrayCart"));
  console.log(objectsInLocal);

  for(let key in objectsInLocal){

    let cart = new Cart(objectsInLocal[key].key, objectsInLocal[key].value);
  
    arrayCart.push(cart);

  };
};*/




function addProductToArray(id, color, qty) {
  let cart = new Cart(id + color, qty, id, color);

  if(qty !== 0 && color !== ""){
    arrayCart.push(cart);
    console.log(arrayCart);
  };
};



function changeQuantityOfProduct(id, color, chosenQuantity, quantityAlreadyThere, position){
  if(chosenQuantity !== 0 && color !== ""){
    let newQuantity = quantityAlreadyThere + chosenQuantity;
    let newProduct = new Cart (id + color, newQuantity, id, color);
    arrayCart.splice(position, 1, newProduct);
  };
};



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