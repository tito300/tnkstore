/* * *
 *
 *  DOM query selectors
 *  Some selectors are dynamic and for that they are
 *  not included on the top but rather in the functions
 *
 * * */
let items = document.querySelectorAll('.cart-item');
const totalPrice = document.querySelector('.total-item .price');
const cartIcon = document.querySelector('.fa-shopping-cart');
let exits = document.querySelectorAll('#x');
const cartUl = document.querySelector('.cart-list');

/* * *
 *
 *  Event listeners
 *
 * * */
document.addEventListener('DOMContentLoaded', contentLoaded);
exits.forEach((c) => { c.addEventListener('click', removeItem); });

const signedin = (localStorage.getItem('signedin') === 'true');

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

  /* if user is signed out the local storage will be used to populate cart */
  if (!signedin) {
    const localItems = JSON.parse(localStorage.getItem('cartItems'));
    let itemsHtml = localItems.map(item => `<li class="cart-item" style="overflow: hidden" data-idMain="${item.id}">
      <img src="../${item.img}" style="height:100px; width:100px" alt="">
      <div class="cart-item-details">
  
          <div class="cart-main">
              <h3 class="cart-item-title">
                  ${item.title}
              </h3>
              <i class="fa fa-times-circle" aria-hidden="true" id="x" data-id="${item.id}"></i>
          </div>
  
          <div class="cart-variables">
              <div class="qty-dropdown">
                  <span>Qty: </span>
                  <select data-qty="${item.count}" name="Qty" id="${item.id}"
                      class="cart-item-var">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                  </select>
              </div>
  
  
              <var class="cart-item-var">Price: $<span class="price">
                      ${item.price}</span></var>
          </div>
      </div>
      </li>`);
    itemsHtml = itemsHtml.join('');
    cartUl.innerHTML = itemsHtml;

    // ensures recently inserted items are included in selection.
    items = document.querySelectorAll('.cart-item');
    exits = document.querySelectorAll('#x');
    exits.forEach((c) => { c.addEventListener('click', removeItem); });

    // adds css class for cool effect
    setTimeout(() => {
      items.forEach((element) => {
        element.classList.add('expand');
      });
    }, 0);
  }

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

  if (!signedin) {
    const items = JSON.parse(localStorage.getItem('cartItems'));
    items.forEach((i) => {
      if (i.id === productID.toString()) {
        i.count = productQty;
      }
    });
    localStorage.setItem('cartItems', JSON.stringify(items));
  } else {
    const dataRes = await fetch('/cart/update-qty', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: resbody,
    });
    const finaldata = await dataRes.json();
    cartIcon.textContent = finaldata.totalItemsInCart;
  }
}

async function removeItem(e) {
  e.preventDefault();

  // get id of item to send to database for deleting
  body = {
    itemID: this.dataset.id,
  };

  // deleting parent element of list item from list and from database
  document.querySelector(`[data-idMain="${this.dataset.id}"]`).classList.add('remove-smooth');
  setTimeout(() => {
    document.querySelector(`[data-idMain="${this.dataset.id}"]`).style.display = 'none';
  }, 5000);
  // document.querySelector(`[data-idMain="${this.dataset.id}"]`).remove();

  if (!signedin) {
    const items = JSON.parse(localStorage.getItem('cartItems'));
    const newItems = items.filter(element => element.id !== this.dataset.id);
    localStorage.setItem('cartItems', JSON.stringify(newItems));
    updateTotalCount(newItems.length);
  } else {
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


/**
 * updates total count in the header
 *
 */
function updateTotalCount(number) {
  if (typeof number !== 'number') throw new Error('total count must be a number');
  if (number === 0) {
    cartIcon.textContent = '';
  } else {
    cartIcon.textContent = number;
  }
}
