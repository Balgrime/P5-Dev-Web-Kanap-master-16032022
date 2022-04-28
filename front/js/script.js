/**
 * Requête les informations des produits de l'api.
 * @returns le tableau d'objets contenus dans l'api.
 */
async function loadProducts(){
  return (await fetch("http://localhost:3000/api/products")).json();
};



loadProducts().then(showValue).catch(showError);

/**
 * Affiche les informations des produits sur la page lorsque la promesse est remplie.
 * @param {Object[]} value le tableau d'objets de l'api dont on va successivement soutirer les informations.
 */
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

/**
 * Fonction qui signale lorsque la promesse n'a pas pu être tenue.
 */
function showError(){
  document.getElementById("items").innerHTML = "<p>Items non chargés, veuillez vérifier la connexion du serveur de l'api</p>"
};