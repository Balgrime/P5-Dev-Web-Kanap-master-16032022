let urlPageProduct = window.location.search;
let urlSearchParams = new URLSearchParams(urlPageProduct);
let orderId = urlSearchParams.get("orderId");


document.getElementById("orderId").innerHTML = orderId;

localStorage.clear();