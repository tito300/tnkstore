const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require("../models/product");
const Convert = require("../seed/db-to-cart.js")
 

router.get("/cart/add/:id", (req, res)=>{
    // debugger;

    // pull product information -> create a cart item object -> push to cart -> calc values

    // 1- pull product information
    let productID = req.params.id;
    Product.findOne({id: productID})
            .then((data)=> {

                
                let newObj = new Convert(data, req);
                let objID = newObj.id;
                
                //  to find whether item has been added before or not
                User.findOne({"cart.items.id": objID}).then((data)=>{
                  if(!data) {
                    User.update({ googleID: req.user.googleID}, {$push: {"cart.items": newObj}}, ()=> {console.log("new item added to cart!")});
                  }  else if (data){
                    // debugger;  
                    
                    // find index of item to pull index which will be used to update total - 
                    let index = data.cart.items.findIndex((c)=>{ return c.id === objID})  
                    let total = data.cart.items[index].total;
                    total++  
                //  find sub object in array by id -> use $ to refer to object found in array and then update value
                    User.update({ "cart.items.id": objID}, {$set: {"cart.items.$.total": total}}, ()=> {console.log("total update done!")});
                    total = 1;
                  }
                    
                })
                
            });
    


    res.redirect("/top-sellers");

})

module.exports = router;