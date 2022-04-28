/**
 * Permet de récupérer le numéro de commande depuis l'URL de la page.
 */
let urlPageProduct = window.location.search;
let urlSearchParams = new URLSearchParams(urlPageProduct);
let orderId = urlSearchParams.get("orderId");


document.getElementById("orderId").innerHTML = orderId;

localStorage.clear();