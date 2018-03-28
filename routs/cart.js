const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require("../models/product");
const util = require("../util/util.js")



router.get("/cart/add/:id", (req, res)=>{
    // debugger;

    // pull product information -> create a cart item object -> push to cart -> calc values

    // 1-find and pull item
    let productID = req.params.id;
    Product.findOne({id: productID})
            .then((data)=> {
                // debugger;
                
                let newObj = new util.convert(data, req);
                let objID = newObj.id;
                
                //  2- find whether item has been added before or not
                User.findOne({"cart.items.id": objID})
                    .then((data)=>{

                        // 3- add item/total
                        if(!data) {
                            User.update({ googleID: req.user.googleID}, {$addToSet: {"cart.items": newObj}}, ()=> {console.log("new item added to cart!")})
                                .then(()=>{

                                    User.findOne({googleID: req.user.googleID})

                                    // calc totalItems
                                    .then((data)=> {
                                        debugger;
                                        let totalItems = util.calcTotals(data.cart.items);
                                        data.cart.totalItems = totalItems.items;
                                        data.cart.totalPrice = totalItems.price;
                                        data.save();
                                        // console.log(totalItems);
                                        // res.redirect("/top-sellers");
                                        // res.end();
                                        let body = {
                                            total: totalItems.items
                                        }
                                        res.send(JSON.stringify(body));

                                    })
                                });


                        }  else if (data){
                            // debugger;  
                            
                            // find index of item to pull index which will be used to update total - 
                            let index = data.cart.items.findIndex((c)=>{ return c.id === objID})  
                            let total = data.cart.items[index].total;
                            total++  
                            //  find sub object in array by id -> use $ to refer to object found in array and then update value
                            User.update({ "cart.items.id": objID}, {$set: {"cart.items.$.total": total}}, ()=> {console.log("total update done!")})
                            .then(()=>{

                                User.findOne({googleID: req.user.googleID})

                                // calc totalItems
                                .then((data)=> {
                                        debugger;
                                        let totalItems = util.calcTotals(data.cart.items);
                                        data.cart.totalItems = totalItems.items;
                                        data.cart.totalPrice = totalItems.price;
                                        data.save();
                                        // console.log(totalItems);
                                        // res.redirect("/top-sellers");
                                        let body = {
                                            total: totalItems.items
                                        }
                                        res.send(JSON.stringify(body));
                                })
                            });

                            total = 1;
                        }

                        
                            
                        })
                
            });
    


    // res.redirect("/top-sellers");

});





router.get("/cart/main", (req, res, next)=> {
    // debugger;
    res.render("cart/cartPage", { "user": req.user });
})





router.put("/cart/update-qty", (req, res)=> {
    // debugger;

    // let itemQty = parseInt(req.body.itemsQty);
    let itemID = String(req.body.itemID)
    // User.find({"cart.items[0].id": req.body.itemID}).then((userfound)=> console.log(userfound));
    User.update({ "cart.items.id": itemID }, {$set: {"cart.items.$.total": req.body.itemsQty}})
        .then(()=>{
            // debugger;
             User.findOne({googleID: req.user.googleID})

        // calc totalItems
        .then((data)=> { 
            debugger;

              console.log("data: " + data.cart);
              let totalItems = util.calcTotals(data.cart.items);
              data.cart.totalItems = totalItems.items;
              data.cart.totalPrice = totalItems.price;
              data.save();

              let totalsFile = {
                  totalItems: totalItems.items
              }

              res.send(JSON.stringify(totalsFile));
             // console.log(totalItems);
              
         }).catch((err)=>{
             console.log(err);
         });

        });

});

router.delete("/cart/delete/:id", (req, res)=>{
    // debugger;
    let itemID = req.params.id;
    console.log(typeof itemID)
    User.update({ googleID: req.user.googleID}, {$pull: {"cart.items": {"id": req.params.id} }}).then(()=>{
        // debugger;
         User.findOne({googleID: req.user.googleID})
    // calc totalItems
    .then((data)=> { 
        // debugger;

          console.log("data: " + data.cart);
          let totalItems = util.calcTotals(data.cart.items);
          data.cart.totalItems = totalItems.items;
          data.cart.totalPrice = totalItems.price;
          data.save();

          let totalsFile = {
              totalItems: totalItems.items
          }

          res.send(JSON.stringify(totalsFile));
         // console.log(totalItems);
          
     }).catch((err)=>{
         console.log(err);
     });
    })

});

module.exports = router;