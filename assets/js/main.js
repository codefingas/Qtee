
var app = {
    cartCtrl: function () {
     //empty cart...
        'use strict';
    
        
     //an object constructor that we can use to create items...
     function Item(name, price, count, unit, img) {
        this.name = name;
        this.price = price;
        this.count = count;
        this.unit = unit;
        this.img = img;
     }
    var cart = [];


     //adding items to cart .....
     function addItemToCart(name, price, count,unit,img){
         for(var i in cart){
            if(cart[i].name === name){
               cart[i].count += count; 
               cart[i].price += price;
               saveOurCart();
               return;
            } 
         }
         var item = new Item(name, price, count, unit, img);
         cart.unshift(item);
         saveOurCart();
         console.log(cart);
     }


     //removes an item from cart
     function removeAnItemFromCart(name) {
         for(var i in cart){
             if(cart[i].name === name){
                 cart[i].count--;
                 cart[i].price--;
                 if(cart[i].count === 0){
                     cart.splice(i, 1);
                 }
                 break; 
             }
         }
         saveOurCart();
        //  console.log(cart);
     }


    //  addItemToCart("bag", 4, 1, "kg", "bag.png"); 
    //  addItemToCart("bag", 4, 1, "kg", "bag.png");
    //  addItemToCart("bag", 4, 1, "kg", "bag.png");
    //  addItemToCart("shoe", 4, 2, "kg", "shoe.png");
     
    //  addItemToCart("rope", 12, 3, "inch", "rope.png");

    // removeAnItemFromCart("bag");


    
    //removeItemFromCartAll, all items....
    function removeItemFromCartAll(name){
        for(var i in cart){
            if(cart[i].name === name){
                cart.splice(i, 1);
                break;
            }
        }
     }


     //clear cart....
     function clearAllItemsFromCart(){
         cart = [];
         saveOurCart();
         console.log(cart);    
     }


     //clear totalCountOfItems
     function totalCountOfItems(){
         var total = 0;
         for(var i in cart){
             total += cart[i].count
         }
         return total;
     }


     function totalAmount(){
         var amount = 0;
         for(var i in cart){
             amount += cart[i].price * cart[i].count;
         }
         return amount;
     }



     //deliveryFee
     function deliveryFee(){
        var fee = 0;
         return fee;
     }


     //serviceCharge
     function serviceCharge(percent){
         var service = 0;
         service = (percent/100) * totalAmount();
         return service;
     }


     //grandTotal...fee and percent was passed cos they were passed intially
     function grandTotal(fee, percent){
         var grandTotal = 0;
         grandTotal = (totalAmount(0) + deliveryFee(0) + serviceCharge(10));

         return grandTotal;
     }

     //duplicateCart
     function duplicateCart(){
         var cartCopy = [];
         for(var i in cart){
             var item = cart[i];
             var itemCopy = {};
             for(var p in item){
                 itemCopy[p] =item[p];
             }
             cartCopy.push(itemCopy);
         }
         return cartCopy;
     }

     //displayCartChanges....changes made in the cart
     function displayCartChanges(){
         var cartArray = duplicateCart();
         var output = '';

         for (var i in cartArray){
            //  `` is the same as ""

             output += `<li>${cartArray[i].name} -- ${cartArray[i].price } <span style="color:#D00;" class="remove" data-action = ${cartArray[i].name}>X</span> </li>`;  //ES6 syntax
             //output += "<li>" + cartArray[i].name "</li> "  //ES5 syntax    
         }
         var cartItems = document.getElementById('cartItems');
         var payoutCart = document.getElementById('payout_cart');
         var counter = document.getElementById('count');
         var checkout_count = document.getElementById('checkout_count');
         var totalAmount = document.getElementById('totalAmount');
         var checkout_totalAmount = document.getElementById('checkout_totalAmount');
         var cart_count = document.getElementById('cart_count');
         var small_cart_count = document.getElementById('small_cart_count');
         var cartList = document.getElementById("cartItems");


         cartItems.innerHTML = output;
         payoutCart.textContent = cartList.textContent;
         counter.innerHTML = totalCountOfItems();
         cart_count.innerHTML = totalCountOfItems();
         totalAmount.innerHTML =  grandTotal();
         checkout_count.innerHTML = totalCountOfItems();
         checkout_totalAmount.innerHTML = grandTotal();
         small_cart_count.innerHTML = totalCountOfItems();
     }


     //saveOurCart...when changes are made
     function saveOurCart(){
         localStorage.setItem("switchCart", JSON.stringify(cart));
     }


     //loadOurCart
     function loadOurCart(){
         cart = JSON.parse(localStorage.getItem("switchCart"));
     }



     var products = Array.from(document.getElementById('products').querySelectorAll('.card'));
     var removes = Array.from(document.querySelectorAll('.remove'));
     var clearCart = document.getElementById('clear_cart');



     
     
     // console.log(products);

     function productHandler(){
        var name = this.getAttribute('data-name');
        var price = this.getAttribute('data-price');
        var unit = this.getAttribute('data-unit');
        var img = this.getAttribute('data-img');


        addItemToCart(name, price, 1, unit, img);
        displayCartChanges();

        //  console.log(this);
     }

     //removeHandler
     function removeHandler(){
         //alert("hi!");
         var name = this.getAttribute('data-action');
         console.log(this.parentElement);
         removeItemFromCartAll;
     }
// 



     products.forEach(function(product){
         product.addEventListener('click', productHandler);
     });

     removes.forEach(function(remove){
         document.addEventListener('click', remove, removeHandler)
     });

     document.addEventListener('click', function(e){
         if(e.target.className !== 'remove'){
             return;
         }
         e.target.parentElement.remove();
         var name = e.target.getAttribute('data-action');
         removeItemFromCartAll(name);
         displayCartChanges();
        // console.log(e.target.className);

     });

     clearCart.addEventListener('click', function(){
         clearAllItemsFromCart();
         displayCartChanges();
     });

     loadOurCart();
     displayCartChanges();
     
   }
    
};