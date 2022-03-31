let urlPageProduct = window.location.search;
console.log(urlPageProduct);

let urlSearchParams = new URLSearchParams(urlPageProduct);
let idProductActif = urlSearchParams.get("id");
console.log(idProductActif);



async function loadProductActif(){
    return (await fetch("http://localhost:3000/api/products/" + idProductActif)).json();
};



document.addEventListener("DOMContentLoaded", async () => {
  try {
    let productActif = await loadProductActif();
  } catch {
    document.getElementById("title").innerHTML = "<p>Item non chargé, veuillez vérifier la connexion du serveur de l'api</p>"
  }
});



loadProductActif().then(function displayData(productActif){

  document.getElementById("title").innerHTML = productActif.name;
  document.getElementsByClassName("item__img")[0].innerHTML = `<img src="${productActif.imageUrl}" alt="${productActif.altTxt}">`;

  document.getElementById("price").innerHTML = productActif.price;
  document.getElementById("description").innerHTML = productActif.description;

  for (let chosenColor of productActif.colors){
      document.getElementById("colors").innerHTML += `<option value="${chosenColor}">${chosenColor}</option>`
      console.log(chosenColor);
  }
});











let addToCart = document.getElementById("addToCart");

addToCart.addEventListener("click", function(){

  
let elementAlreadyThere = false;


let idQuantity = document.getElementById("quantity");
let chosenQuantity = parseInt(idQuantity.value);
console.log(chosenQuantity);

let idColor = document.getElementById("colors");/*.getAttribute("value");*/
let pickedColor = idColor.value;
console.log(pickedColor);

let elementJson = {
  id : idProductActif,
  quantity : chosenQuantity,
  color : pickedColor
}
let elementLinear = JSON.stringify(elementJson);

function addElementToLocalStorageWhenNotAlreadyThere(){
  localStorage.setItem(idProductActif + pickedColor, elementLinear);
};

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
  localStorage.setItem(idProductActif + pickedColor, replacementElementLinear);
};

  checkElement();

  if(elementAlreadyThere == false){
    addElementToLocalStorageWhenNotAlreadyThere();
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