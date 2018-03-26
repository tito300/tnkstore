let Convert = function(obj, req) {
    this.id = obj.id;
    this.title = obj.title;
    this.price = obj.price;
    this.items = 0;
    this.total = 1;

    // console.log(req.user.cart);
}

module.exports.convert = Convert;

module.exports.calcTotals = function(array){
    // debugger;
    let total = 0;
    array.forEach((c) => {
        total += c.total;
    });
    return total
}