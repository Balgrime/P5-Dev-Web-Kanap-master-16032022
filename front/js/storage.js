export let Storage = {
  /**
   * Permet de sauvegarder une clef et un tableau de valeur au LocalStorage
   * @param {string} key clef à ajouter
   * @param {Object[]} value tableau de valeurs à ajouter
   */
    save(key, value){
        let linearValue = JSON.stringify(value);
        localStorage.setItem(key, linearValue);
    },
    /**
     * Permet de charger le cart actuel depuis le LocalStorage
     * @param {Object[]} arrayCart le tableau du cart de la page à remplir
     * @param {Object} Cart la classe cart de laquelle on veut créer de nouveaux objets
     */
    load(arrayCart, Cart){
        let objectsInLocal = JSON.parse(localStorage.getItem("arrayCart"));
        console.log(objectsInLocal);
      
        for(let key in objectsInLocal){
          let cart = new Cart(objectsInLocal[key].key, objectsInLocal[key].value, objectsInLocal[key].id, objectsInLocal[key].color);
        
          arrayCart.push(cart);
        };
      }
};