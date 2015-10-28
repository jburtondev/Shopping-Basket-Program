/* Defines database interactions */

var database = (function(shoppingBasket) {

  //----------Private objects----------//

  //Firebase server
  var db = new Firebase("https: //radiant-torch-9133.firebaseio.com/");

  shoppingBasket.addToRemoteBasket = function (item) {
      db.push({
        title: item.title,
        desc: item.desc,
        price: item.price,
        itemMainTitle: item.itemMainTitle
      });
  };

  shoppingBasket.access = function () {
      return db;
  }

  return shoppingBasket;

})(shoppingBasket || {});
