const items = document.querySelectorAll(".cart-item");
const totalPrice = document.querySelector(".total-item .price");



document.addEventListener("DOMContentLoaded", contentLoaded);
// let condition = false;

function contentLoaded() {
    let total = 0;
    let qty = 0;
    // console.log(items[0].querySelector(".qty").textContent);
    items.forEach((c)=>{
        //  change total price when qty changes
        c.querySelector("select").addEventListener("change", qtyChange);

        // get qty that was added by database
        let qty = c.querySelector("select").dataset.qty;
        // change default qty
        c.querySelector("[value=\"" + qty + "\"]").setAttribute("selected", "selected");

        // let qty = parseInt(c.querySelector(".qty").textContent);
        let price = parseFloat(c.querySelector(".price").textContent).toFixed(2);
        total += qty*price;
    })

    totalPrice.innerHTML = `${total.toFixed(2)}`;
    // condition = false
}



function qtyChange(e){
    // debugger
    let total = 0;
    let qty = 0;

    let productID = parseInt(e.srcElement.id);
    let productQty = document.getElementById(productID).value;

    console.log(productQty);
    
    items.forEach((c)=>{
        
        let qty = c.querySelector("select").value;
        let price = parseFloat(c.querySelector(".price").textContent).toFixed(2);

        total += qty*price;
        
    })
    totalPrice.innerHTML = `${total.toFixed(2)}`;

    let body = {
        itemID: productID,
        itemsQty: productQty
    }

    body = JSON.stringify(body);
    var xhr = new XMLHttpRequest();
        xhr.open("PUT", '/cart/update-qty', true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onload = function () {
            var users = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
                console.table(users);
            } else {
                console.error(users);
            }
            }
        xhr.send(body);
}