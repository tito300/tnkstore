/* * *
 *
 *  DOM query selectors
 *  Some selectors are dynamic and for that they are
 *  not included on the top but rather in the functions
 *
 * * */
const items = document.querySelectorAll('.cart-item');
const totalPrice = document.querySelector('.total-item .price');
const cartIcon = document.querySelector('.fa-shopping-cart');
const exits = document.querySelectorAll('#x');
const cartUl = document.querySelector('.cart-list');

/* * *
 *
 *  Event listeners
 *
 * * */
document.addEventListener('DOMContentLoaded', contentLoaded);
exits.forEach((c) => { c.addEventListener('click', removeItem); });


/* * *
 *
 *  initial function setting page up after content are loaded.
 *  the reason is that if the querys inside the this function
 *  are called before content is loaded we get an error or the
 *  wrong data.
 *
 * * */
function contentLoaded() {
  let total = 0;

  items.forEach((c) => {
    //  change total price when qty changes
    c.querySelector('select').addEventListener('change', qtyChange);

    // get qty that was added by database
    const qty = c.querySelector('select').dataset.qty || 0;
    // change default qty
    c.querySelector(`[value="${qty}"]`).setAttribute('selected', 'selected');
    const price = parseFloat(c.querySelector('.price').textContent).toFixed(2);
    total += qty * price;
  });

  totalPrice.innerHTML = `$${total.toFixed(2)}`;
  // condition = false
}

/* * *
 *
 *  Events functions
 *
 * * */
async function qtyChange(e) {
  let total = 0;

  const productID = parseInt(e.srcElement.id);
  const productQty = document.getElementById(productID).value;

  const itemsLeft = document.querySelectorAll('.cart-item');
  itemsLeft.forEach((c) => {
    const qty = c.querySelector('select').value;
    const price = parseFloat(c.querySelector('.price').textContent).toFixed(2);

    total += qty * price;
  });
  totalPrice.innerHTML = `${total.toFixed(2)}`;

  let resbody = {
    itemID: productID,
    itemsQty: productQty,
  };

  resbody = JSON.stringify(resbody);

  const dataRes = await fetch('/cart/update-qty', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'same-origin',
    body: resbody,
  });
  const finaldata = await dataRes.json();
  cartIcon.textContent = finaldata.totalItems;
}

async function removeItem(e) {
  e.preventDefault();

  // get id of item to send to database for deleting
  body = {
    itemID: this.dataset.id,
  };

  // deleting parent element of list item from list and from database
  document.querySelector(`[data-idMain="${this.dataset.id}"]`).remove();
  const dataRes = await fetch(`/cart/delete/${this.dataset.id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'same-origin',
  });
  const { totalItems } = await dataRes.json();
  if (totalItems === 0) {
    const hElement = document.createElement('h2');
    hElement.innerText = 'Your cart is empty. it\'s time to fill it up!';
    hElement.style.color = 'red';
    cartUl.appendChild(hElement);
    cartIcon.textContent = totalItems;
  } else {
    cartIcon.textContent = totalItems;
  }

  // selecting list of items left in dom to update counts
  const itemsLeft = document.querySelectorAll('.cart-item');
  let total = 0;
  itemsLeft.forEach((c) => {
    const qty = c.querySelector('select').value;
    const price = parseFloat(c.querySelector('.price').textContent).toFixed(2);

    total += qty * price;
  });
  totalPrice.innerHTML = `$${total.toFixed(2)}`;
}
