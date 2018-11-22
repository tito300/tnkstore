/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
const express = require('express');

const router = express.Router();
// const User = require('../models/user');
// const Product = require('../models/product');
const util = require('../util/util.js');


router.post('/cart/add/:id', (req, res) => {
  // pull product information -> create a cart item object -> push to cart -> calc values

  // 1-find and pull item
  const productID = req.params.id;
  Product.findOne({ id: productID })
    .then((data) => {
      const newObj = util.convert(data, req);
      const objID = newObj.id;

      //  2- find whether item has been added before or not
      User.findOne({ 'cart.items.id': objID })
        .then((data) => {
          // 3- add item/total
          if (!data) {
            User.update({ googleID: req.user.googleID }, { $addToSet: { 'cart.items': newObj } }, () => { console.log('new item added to cart!'); })
              .then(() => {
                User.findOne({ googleID: req.user.googleID })

                // calc totalItems
                  .then((data) => {
                    const totalItems = util.calcTotals(data.cart.items);
                    data.cart.totalItems = totalItems.items;
                    data.cart.totalPrice = totalItems.price;
                    data.save();
                    // console.log(totalItems);
                    // res.redirect("/top-sellers");
                    // res.end();
                    const body = {
                      total: totalItems.items,
                    };
                    res.sendFile(newObj.img);
                    res.end();
                  });
              });
          } else if (data) {
            // find index of item to pull index which will be used to update total -
            const index = data.cart.items.findIndex(c => c.id === objID);
            let total = data.cart.items[index].total; //eslint-disable-line
            total++;
            //  find sub object in array by id -> use $ to refer to object
            //  found in array and then update value
            User.update({ 'cart.items.id': objID }, { $set: { 'cart.items.$.total': total } }, () => { console.log('total update done!'); })
              .then(() => {
                User.findOne({ googleID: req.user.googleID })

                // calc totalItems
                  .then((data) => {
                    const totalItems = util.calcTotals(data.cart.items);
                    data.cart.totalItems = totalItems.items;
                    data.cart.totalPrice = totalItems.price;
                    data.save();
                    // console.log(totalItems);
                    // res.redirect("/top-sellers");
                    const body = {
                      total: totalItems.items,
                    };
                    res.send(JSON.stringify(body));
                  });
              });

            total = 1;
          }
        });
    });


  // res.redirect("/top-sellers");
});


router.get('/cart/main', (req, res, next) => {
  res.render('cart/cartPage-test', { 'user': req.user });
});


router.put('/cart/update-qty', (req, res) => {
  // let itemQty = parseInt(req.body.itemsQty);
  const itemID = String(req.body.itemID);
  // User.find({"cart.items[0].id": req.body.itemID}).then((userfound)=> console.log(userfound));
  User.update({ 'cart.items.id': itemID }, { $set: { 'cart.items.$.total': req.body.itemsQty } })
    .then(() => {
      User.findOne({ googleID: req.user.googleID })

        // calc totalItems
        .then((data) => {
          const totalItems = util.calcTotals(data.cart.items);
          data.cart.totalItems = totalItems.items;
          data.cart.totalPrice = totalItems.price;
          data.save();

          const totalsFile = {
            totalItems: totalItems.items,
          };

          res.send(JSON.stringify(totalsFile));
          // console.log(totalItems);
        }).catch((err) => {
          console.log(err);
        });
    });
});

router.delete('/cart/delete/:id', (req, res) => {
  const itemID = req.params.id;

  User.update({ googleID: req.user.googleID }, { $pull: { 'cart.items': { 'id': req.params.id } } }).then(() => {
    User.findOne({ googleID: req.user.googleID })
    // calc totalItems
      .then((data) => {
        const totalItems = util.calcTotals(data.cart.items);
        data.cart.totalItems = totalItems.items;
        data.cart.totalPrice = totalItems.price;
        data.save();

        const totalsFile = {
          totalItems: totalItems.items,
        };

        res.send(JSON.stringify(totalsFile));
        // console.log(totalItems);
      }).catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
