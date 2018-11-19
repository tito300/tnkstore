const convert = function (obj, req) {
  const newObj = {};
  newObj.id = obj.id;
  newObj.title = obj.title;
  newObj.price = obj.price;
  newObj.items = 0;
  newObj.total = 1;
  newObj.img = obj.photo;

  return newObj;
  // console.log(req.user.cart);
};

module.exports.convert = convert;

module.exports.calcTotals = function (array) {
  // debugger;
  const total = {
    items: 0,
    price: 0,
  };

  array.forEach((c) => {
    total.items += parseInt(c.total);
    total.price += c.total * c.price;
  });
  return total;
};
