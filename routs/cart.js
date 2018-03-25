const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require("../models/product");
const Convert = require("../seed/db-to-cart.js")
 

router.get("/cart/add/:id", (req, res)=>{
    debugger;

    // pull product information -> create a cart item object -> push to cart -> calc values

    // 1- pull product information
    let productID = req.params.id;
    Product.findOne({id: productID})
            .then((data)=> {

                
                let newObj = new Convert(data, req);
                let objID = newObj.id;
                //  to increment total if item is already added once
                let total = newObj.total;
                
                //  to find whether item has been added before or not
                User.findOne({"cart.items.id": objID}).then((data)=>{
                  if(!data) {
                    User.update({ googleID: req.user.googleID}, {$push: {"cart.items": newObj}}, ()=> {console.log("update done!")});
                  }  else if (data){

                    total++  
                //  find sub object in array by id -> use $ to refer to object found in array and then update value
                    User.update({ "cart.items.id": objID}, {$set: {"cart.items.$.total": total}}, ()=> {console.log("update done!")});
                  }
                    
                })
                
            });
    



    // increase by one each time add button is hit
    // let totalItems = (()=> { return req.user.cart.totalItems + 1})();
    
    // query using googleID because mongodbID will change each session
    // User.update({ googleID: req.user.googleID}, { $set: {"cart.totalItems": totalItems}}, ()=> {console.log("console.log: ------- " + req.user.cart.totalItems)});
    res.redirect("/top-sellers");

})

module.exports = router;