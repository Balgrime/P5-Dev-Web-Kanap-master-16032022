async function loadProducts(){
  return (await fetch("http://localhost:3000/api/products")).json();
};

/*document.addEventListener("DOMContentLoaded", async () => {
  try {
    let value = await loadProducts();
  } catch {
    document.getElementById("items").innerHTML = "<p>Items non chargés, veuillez vérifier la connexion du serveur de l'api</p>"
  }
});*/


loadProducts().then(showValue).catch(showError);


function showValue(value){
  for (let product of value){
    document.getElementById("items").innerHTML += `<a href="./product.html?id=${product._id}">
                                                      <article>
                                                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                        <h3 class="productName">${product.name}</h3>
                                                        <p class="productDescription">${product.description}</p>
                                                      </article>
                                                    </a>`
  };
};

function showError(){
  document.getElementById("items").innerHTML = "<p>Items non chargés, veuillez vérifier la connexion du serveur de l'api</p>"
};






/*fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
    for (let product of value){
      document.getElementById("items").innerHTML += `<a href="./product.html?id=${product._id}">
                                                        <article>
                                                          <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                          <h3 class="productName">${product.name}</h3>
                                                          <p class="productDescription">${product.description}</p>
                                                        </article>
                                                      </a>`
    }
  })
  .catch(function(err) {
    document.getElementById("items").innerHTML = "<p>Items non chargés, veuillez vérifier la connexion du serveur de l'api</p>"
    // Une erreur est survenue
});*/