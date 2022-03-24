let urlPageProduct = window.location.search;
console.log(urlPageProduct);

let urlSearchParams = new URLSearchParams(urlPageProduct);
let idProductActif = urlSearchParams.get("id");
console.log(idProductActif);



fetch("http://localhost:3000/api/products/" + idProductActif)
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
});