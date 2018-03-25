const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require("../models/product");
 

router.get("/cart/add/:id", (req, res)=>{
    debugger;

    // pull product information -> create a cart item object -> push to cart -> calc values

    // 1- pull product information
    let productID = req.params.id;
    Product.findOne({id: productID})
            .then((data)=> {


            });
    



    // increase by one each time add button is hit
    let totalItems = (()=> { return req.user.cart.totalItems + 1})();
    
    // query using googleID because mongodbID will change each session
    User.update({ googleID: req.user.googleID}, { $set: {"cart.totalItems": totalItems}}, ()=> {console.log("console.log: ------- " + req.user.cart.totalItems)});
    res.redirect("/top-sellers");

})

module.exports = router;