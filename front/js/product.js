let urlPageProduct = window.location.search;
console.log(urlPageProduct);

let urlSearchParams = new URLSearchParams(urlPageProduct);
let idProductActif = urlSearchParams.get("id");
console.log(idProductActif);