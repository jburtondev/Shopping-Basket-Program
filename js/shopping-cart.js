/*
 * Copyright (c) 2014 www.jjburton.com All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

var shoppingBasket = (function () {
    "use strict";

    //----------Private objects----------//

    //Contains an index of items
    var basketItems = [];

    //Temporarily holds basket-item
    var tempItemList = [];

    //Div which displays the amount of items
    var itemAmount = document.getElementById("amount-of-items");

    //Total price of all items
    var totalPrice = 0;

    //Div which displays the running total cost
    var runningTotalCost = document.getElementById("running-total-cost");

    //Div which hold the html to show the basket
    var basketBox = document.getElementById("pop-up-box");

    //Basket DOM elements
    var makeItemButton =  document.getElementById("cart-button-make-item");
    var showBasketButton =  document.getElementById("cart-button-show-basket");
    var updateBasketButton =  document.getElementById("cart-button-update-basket");
    var hideBasketButton =  document.getElementById("cart-button-hide-basket");

    var currentPos = 0;

    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

    var isBasketEmpty = function () {

        //If basket is empty, tell the user
        if (basketItems.length == 0) {

            alert("Your basket is empty!");

        }

    }

    //Fades an element into the page
    var fadeIn = function (el) {
        el.style.opacity = 0;

        var last = +new Date();
        var tick = function () {
            basketBox.style.opacity = +basketBox.style.opacity + (new Date() - last) / 400;
            last = +new Date();

            if (+basketBox.style.opacity < 1) {
                (requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
            }
        };

        tick();
    }

    //Constructor function for 'Item'
    var Item = function (title, desc, price) {

        this.title = title;
        this.desc = desc;
        this.price = price;

    };

    //Main title for Item
    Item.prototype.itemMainTitle = "";

    //Creates a new table for a new item
    var updateTable = function () {

        //Stores table on page as table
        var table = document.getElementById("table-body");

        //Data within the table
        var tableData = "";

        //Rewrite using DOM table methods!!!!
        for (var i = 0; i < tempItemList.length; i++) {
            tableData += "<tr id = 'basket-item'>";
            tableData += "<td id = 'item-style'>" + tempItemList[i].title + "</td>";
            tableData += "<td id = 'item-style'>" + tempItemList[i].desc + "</td>";
            tableData += "<td id = 'item-style'>" + "£" + tempItemList[i].price + "</td>";
            tableData += "<td>" +
                "<button onclick ='shoppingBasket.addToBasket()' id = 'add-to-basket'>Add to Basket</button>" + "</td>";
            tableData += "</tr>";
        }

        table.innerHTML = tableData;

    }

    return {


        //----------Public objects----------//

        makeItem: function () {
            "use strict";

            //Targets item input elements
            var title = document.getElementById("title-input").value;
            var desc = document.getElementById("desc-input").value;
            var price = parseInt(document.getElementById("price-input").value);

            //Validates if all fields are filled

                if (title == null || title == "" || desc == null ||
                    desc == "" || price == null || price == "") {
                    alert("All field need to be filled out");
                    return;
                } else {

                    //Creates new item
                    var newItem = new Item(title, desc, price);

                    //Sets itemMainTitle prototype as the items main title
                    newItem.itemMainTitle = newItem.title;

                    //Pushes newItem into array
                    tempItemList.push(newItem);

                    //Creates new table for item
                    updateTable();

                    return;

                }

        },

        addToBasket: function () {

            //Empties currentTempItem index
            var currentTempItem = 0;

            //Calls method from database.js module to add item to basket
            database.addToRemoteBasket.call(this, tempItemList[currentTempItem]);

            //Adds item to the basket
            basketItems.push(tempItemList[currentTempItem]);

            //Move to the next index in the array
            currentTempItem++;

            //Removes a basket-item from the DOM
            (function () {

                //Assigns item to variable and removes it from the DOM
                var item = document.getElementById("basket-item");

                item.parentNode.removeChild(item);

            })();

            //Outputs/updates the itemAmount onto the screen
            itemAmount.innerHTML = basketItems.length;

            tempItemList.length--;

            return;

        },

        //Displays the basket
        displayBasket: function () {

            if (basketBox.style.visibility = "hidden") {

                //Sets the popupBox to visible
                return basketBox.style.visibility = "visible";

            }

        },


        //Hides the basket
        hideBasket: function () {

            isBasketEmpty();

            if (basketBox.style.visibility = "visible") {

                //Sets the popupBox to hidden
                return basketBox.style.visibility = "hidden";

            }
        },

        //Displays basketItems to the user
        showBasket: function () {

            fadeIn(basketBox);

            this.displayBasket();

            //Stores table on page as table
            var popup = document.getElementById("pop-up-box");

            //Data within the table
            var popUpData = "";

            //If basket is empty, tell the user
            if (basketItems.length == 0) {

                alert("Your basket is empty!");

            } else {

                //Loop through and output basketItems
                for (var i = 0; i < basketItems.length; i++) {

                    popUpData += " <div id = 'pop-up'>";
                    popUpData += "<p id = 'pop-up-box-title'> Item " + [i] + ": " + basketItems[i].itemMainTitle + "</p>";
                    popUpData += "<p>" + basketItems[i].title + "</p>\n";
                    popUpData += "<p>" + basketItems[i].desc + "</p>\n";
                    popUpData += "<p>£" + basketItems[i].price + "</p\n>";
                    popUpData += "</div>";

                    popup.innerHTML = popUpData;

                }

            }

        },

        updateBasket: function () {

        //Empty basket
        basketItems.length = 0;

        //Update basket with firebase db Data
        database.access().on("value", function(snapshot) {
            console.log(snapshot.val());
            basketItems.push(snapshot.val());
         }, function (errorObject) {
         console.log("The read failed: " + errorObject.code);
         });

       },

       //Assign events to DOM elements
       initialiseEvents: function () {

           makeItemButton.addEventListener("click", this.makeItem);
           showBasketButton.addEventListener("click", this.showBasket);
           updateBasketButton.addEventListener("click", this.updateBasket);
           hideBasketButton.addEventListener("click", this.hideBasket);
           
       }

    };

})();

shoppingBasket.initialiseEvents();
