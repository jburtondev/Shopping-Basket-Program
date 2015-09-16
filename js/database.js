/* Defines database interactions */

var database = (function () {

  //----------Private objects----------//

  //Firebase server
  var db = new Firebase("https://radiant-torch-9133.firebaseio.com/");


  return {

      //Adds item to firebase database basket
      addToRemoteBasket: function (item) {
          db.push({
              title: item.title,
              desc: item.desc,
              price: item.price,
              itemMainTitle: item.itemMainTitle

          });

      },

      //Provides access to the private variable 'db'.
      access: function () {
        return db;
      }

  }

})();
