const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> {
    res.render('index', {"user": req.user});
})

router.get("/top-sellers", (req, res)=> {

    res.render("partials/top-sellers", { 
        "user": req.user,

        "top": [{
        title: "Christmas t-shirt",
        discreption: "This is a special t-shirt for Christmas season",
        photo: "imgs/christmas-1.jpg",
        price: 24.99
    },{
        title: "Funny coding t-shirt",
        discreption: "If you love coding, this is for you",
        photo: "imgs/coding-1.jpg",
        price: 19.99
    },{
        title: "Hunting t-shirt",
        discreption: "This is a special t-shirt for Hunting season",
        photo: "imgs/hunting-1.jpg",
        price: 29.99
    },{
        title: "Hunting funny t-shirt",
        discreption: "This is a funny t-shirt for Hunting season",
        photo: "imgs/hunting-2.jpg",
        price: 14.99
    },{
        title: "Hunting t-shirt",
        discreption: "This is a special t-shirt for Hunting season",
        photo: "imgs/hunting-1.jpg",
        price: 29.99
    },{
        title: "Hunting funny t-shirt",
        discreption: "This is a funny t-shirt for Hunting season",
        photo: "imgs/hunting-2.jpg",
        price: 14.99
    }]})
})

module.exports = router;