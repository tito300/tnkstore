let Convert = function(obj, req) {
    this.id = obj.id;
    this.title = obj.title;
    this.price = obj.price;
    this.items = 0;
    this.total = 1;
    this.img = obj.photo;

    // console.log(req.user.cart);
}

module.exports.convert = Convert;

module.exports.calcTotals = function(array){
    // debugger;
    let total = {
        items: 0,
        price: 0
    }

    array.forEach((c) => {
        total.items += c.total;
        total.price += c.total*c.price;
    });
    return total
}