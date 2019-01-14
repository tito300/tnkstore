const mongoose = require('mongoose');
const Products = require('../products/productModel');

async function start() {
    await mongoose.connect('mongodb://localhost/fullstack4');

    let productsList = await Products.find({});
    let orgLength = productsList.length;
    
    productsList.forEach((product) => {
        let photosArr = product.secondaryPhotos;
        for (let i = 0; i< photosArr.length; i++) {
            if(photosArr[i].color === 'none') continue;
            let name = photosArr[i].link.split(".")[0];
            let ext = photosArr[i].link.split(".")[1]
            photosArr[i].link = `${name}-${i+1}.${ext}`;
        }
    })

    if (productsList.length === orgLength) {
        await Products.remove({});
        await Products.insertMany(productsList)
    } else {
        throw new Error('modified list length did not match original');
    }

    mongoose.disconnect();
  }


start();