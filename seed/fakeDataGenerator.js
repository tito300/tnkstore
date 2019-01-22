/* 
*  sizes are duplicated in some variants and so are not accurate and need to be fixed.
*
*  * * */

const faker = require('faker');
const fs = require('fs');
const os = require('os');

let writeStream = fs.createWriteStream('./seed/50FakeProducts.js');

let data = [];

var reviews = [

  { comment: 'awesome tshirt!', stars: 5},
  { comment: 'Love it! glad I purchased' , stars: 5},
  { comment: 'good item, delivered on time', stars: 4},
  { comment: 'as described. Would buy again', stars: 4},
  { comment: 'Good. would have been better if this item was available in different styles', stars: 3},
  { comment: 'not as expected but its alright', stars: 3},
  { comment: 'good for the price', stars: 3},
  { comment: 'great product and customer service. would purchase again', stars: 5},
  { comment: 'I was happy with the size. Delivery was fast!', stars: 5},
]

for (let i = 0; i < 50; i++){
  let obj = {};
  obj.primaryColor = 'black';
  obj.id= faker.random.uuid();
  obj.title = `${faker.commerce.productName()}`;
  obj.type = `${faker.helpers.randomize(['tshirt', 'sweater', 'tshirt'])}`;
  obj.discreption= faker.lorem.paragraph(3);
  obj.secondaryPhotos=[];
  obj.price= faker.commerce.price(10, 39.99, 2);
  obj.brand= faker.helpers.randomize(['nike', 'Tk Quality', 'instyle']);
  obj.material = faker.helpers.randomize(['cotton', 'polyester', 'fiber']);
  obj.uploadDate= faker.date.recent(260);
  obj.lastModified= Date();
  obj.purchaseCount= 0;
  obj.weight= faker.helpers.randomize(['3.5','5','7'])
  obj.reviews = createReviews();
  obj.rating = getRating();
  obj.category = faker.helpers.randomize(['summer', 'general' ,'humor', 'programming', 'random']);

  let male = createColors('male');
  let female = createColors('female');

  obj.photo= `imgs/${obj.title}.jpg`;


  obj.variants = {
    male,
    female,
  };

  data.push(obj);


  function createColors(gender) {
    let num = faker.random.number({min: 0, max: 4});
    let result = [];
    let colors = []
    for (let i = 0; i <= num; i++) {
      let color =  faker.helpers.randomize(['red', 'grey', 'black']);

      obj.primaryColor= color;

      let exist = colors.filter((a) => a === color)
      if (exist.length > 0) {
        continue;
      } else {
        colors.push(color)            
      }
    }

    // ensure seconderyPhotos match variants numbers
      createPhotos(colors);


    colors.forEach((color)=> {
      result.push({color: color,
        sizes: createSizes(color, gender)})
    })
    
    return result;
  }

  function  createSizes(color, gender) {
    let num = faker.random.number({min: 0, max: 4});
    let result = [];

    for (let i = 0; i <= num; i++) {
      result.push({size: faker.helpers.randomize(['l', 's', 'm', 'xl', 'xxl']),
                  price: faker.commerce.price((Number.parseFloat(obj.price) - 3.00),(Number.parseFloat(obj.price) + 3.00), 2),
                  color,
                  gender,
                  photo: obj.secondaryPhotos.find((n) => n.color === color).link })
    }
    return result;
  }

  function createPhotos(colors) {
    for (let i = 0; i < colors.length; i++) {
        let exist = obj.secondaryPhotos.filter((a) => a.color === colors[i]);
        if (exist.length === 0) {
          obj.secondaryPhotos.push({
            color: colors[i],
            link: `imgs/${obj.title}-${i}.jpg`,
          })

        }
    }
    let exist = obj.secondaryPhotos.filter((a) => a.color === 'none')
    if (exist.length === 0) {
      obj.secondaryPhotos.push({color: 'none', link: ''});
    }
  }

  function createReviews() {
    let result = [];
    let num = faker.random.number({min: 0, max: 10});
    for (let i = 0; i < num; i++) {
      review = faker.helpers.randomize(reviews);
      result.push({
        customer: '',
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        comment: review.comment,
        title: `${review.comment.slice(0, 25)}`,
        stars: review.stars, 
      })
    }
    return result;
  }

  function getRating() {
    let { reviews } = obj;
    let reviewsSum = reviews.reduce((a, b)=> { return a + b.stars }, 0);
    let avg = Math.ceil(reviewsSum / reviews.length);

    let result = avg ? avg : 0;

    return result;
  }
}

writeStream.write(JSON.stringify(data));
writeStream.end();





