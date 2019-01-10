const products = require('./50FakeProducts');
const fs = require('fs');

if (!fs.existsSync('./temp')) {
    fs.mkdirSync('./temp');
}
const fileStream = fs.createWriteStream('./temp/titles.txt');
 

products.forEach(product => fileStream.write(`[ ] ${product.title} ${product.type}
`));

fileStream.end();

