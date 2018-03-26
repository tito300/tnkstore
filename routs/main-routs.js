const express = require('express');
const router = express.Router();
const Products = require("../models/product.js")

router.get('/', (req, res)=> {
    res.render('index', {"user": req.user});
})

router.get("/top-sellers", (req, res)=> {

    Products.find({})
            .then((productsFound)=> { 

                res.render("partials/top-sellers", { 
                        "user": req.user,
                
                        "top": productsFound
                    })

             });

});

module.exports = router;