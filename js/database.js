/* Defines database interactions */

var database = (function () {

  //----------Private objects----------//

  //Firebase server
  var db = new Firebase("https://radiant-torch-9133.firebaseio.com/");


  return {

      addToRemoteBasket: function (item) {
          title: item.title,
          desc: item.desc,
          price: item.price,
          itemMainTitle: item.itemMainTitle

     });

      }

  }

})();
