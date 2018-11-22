const items = document.querySelectorAll('.cart-item');
const totalPrice = document.querySelector('.total-item .price');
const cartIcon = document.querySelector('.fa-shopping-cart');
const exits = document.querySelectorAll('#x');


document.addEventListener('DOMContentLoaded', contentLoaded);
exits.forEach((c) => { c.addEventListener('click', removeItem); });
// let condition = false;

function contentLoaded() {
  let total = 0;
  const qty = 0;
  // console.log(items[0].querySelector(".qty").textContent);
  items.forEach((c) => {
    //  change total price when qty changes
    c.querySelector('select').addEventListener('change', qtyChange);

    // get qty that was added by database
    const qty = c.querySelector('select').dataset.qty;
    // change default qty
    c.querySelector(`[value="${  qty  }"]`).setAttribute('selected', 'selected');

    // let qty = parseInt(c.querySelector(".qty").textContent);
    const price = parseFloat(c.querySelector('.price').textContent).toFixed(2);
    total += qty * price;
  });

  totalPrice.innerHTML = `$${total.toFixed(2)}`;
  // condition = false
}


function qtyChange(e) {
  // debugger
  let total = 0;
  const qty = 0;

  const productID = parseInt(e.srcElement.id);
  const productQty = document.getElementById(productID).value;

  const itemsLeft = document.querySelectorAll('.cart-item');
  itemsLeft.forEach((c) => {
    const qty = c.querySelector('select').value;
    const price = parseFloat(c.querySelector('.price').textContent).toFixed(2);

    total += qty * price;
  });
  totalPrice.innerHTML = `${total.toFixed(2)}`;

  let body = {
    itemID: productID,
    itemsQty: productQty,
  };

  body = JSON.stringify(body);
  // var xhr = new XMLHttpRequest();
  //     xhr.open("PUT", '/cart/update-qty', true);
  //     xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  //     xhr.onload = function () {
  //         var users = JSON.parse(xhr.responseText);
  //         if (xhr.readyState == 4 && xhr.status == "200") {
  //             console.table(users);
  //         } else {
  //             console.error(users);
  //         }
  //         }
  //     xhr.send(body);


  fetch('/cart/update-qty', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'same-origin',
    body,
  }).then(dataRes => dataRes.json())
    .then((finaldata) => {
      cartIcon.textContent = finaldata.totalItems;
    });
}

function removeItem(e) {
  // debugger;

  // get id of item to send to database for deleting
  body = {
    itemID: this.dataset.id,
  };

  // deleting parent element of list item from list
  document.querySelector(`[data-idMain="${  this.dataset.id  }"]`).remove();

  // selecting list of items left for calc
  const itemsLeft = document.querySelectorAll('.cart-item');

  fetch(`/cart/delete/${this.dataset.id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'same-origin',
  }).then(dataRes => dataRes.json())
    .then((finaldata) => {
      cartIcon.textContent = finaldata.totalItems;
    });

  // refresh total price
  let total = 0;
  itemsLeft.forEach((c) => {
    const qty = c.querySelector('select').value;
    const price = parseFloat(c.querySelector('.price').textContent).toFixed(2);

    total += qty * price;
  });
  totalPrice.innerHTML = `$${total.toFixed(2)}`;
}
