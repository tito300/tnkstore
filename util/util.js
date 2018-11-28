const Convert = function (obj) {
  this.id = obj.id;
  this.title = obj.title;
  this.price = obj.price;
  this.items = 0;
  this.count = 1;
  this.img = obj.photo;
};

module.exports.Convert = Convert;

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
