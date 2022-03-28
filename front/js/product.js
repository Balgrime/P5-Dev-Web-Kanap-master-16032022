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