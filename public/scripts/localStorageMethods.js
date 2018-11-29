const cartIcon = document.querySelector('.fa-shopping-cart');


/**
 * updates total count in the header
 *
 */
const updateTotalCount = function (number) {
  if (typeof number !== 'number') throw new Error('total count must be a number');
  if (number === 0) {
    cartIcon.textContent = '';
  } else {
    cartIcon.textContent = number;
  }
};

/**
   *  takes a new cart array and it updates localstorage, cart
   *  total in the header and sync updated backend with an option to merge if specified;
   *
   *  @param {array||object} newCart an array or object the represents the updated cart state
   *  @param {Boolean} updateTotal: if set to false, cart total will not be updated. defaults to true.
   *  @param {Boolean} sync: updated backend database with new cartItems.
   */
const updateCart = async function (newCart, options) {
  if (!(newCart instanceof Array)) throw new Error('newCart must be an array!');

  options = options || {};
  let { updateTotal, sync, merge } = options;
  //   let updateTotal = options.updateTotal;
  //   let sync = options.sync;
  //   let merge = options.merge;

  // default values
  if (updateTotal === undefined) {
    updateTotal = true;
  }
  if (sync === undefined) {
    sync = true;
  }
  if (merge === undefined) {
    merge = false;
  }

  /*
   * if its a merge request the steps below will be performed after new merged
   * cart is recieved from backend
   * */
  if (merge === false) {
    const updatedState = JSON.stringify(newCart);
    localStorage.setItem('cartItems', updatedState);
    if (updateTotal === true) {
      updateTotalCount(newCart.length);
    }
  }

  if (sync === true) {
    syncLocalStorage(newCart, merge);
  }
};


/**
 * get the value of the key provided from localStorage and parse it
 *
 * @param {String} name name of the key to look up; defaults is 'cartItems'
 * @returns the value of the key provided
 */
function getLocalStorage(key = 'cartItems') {
  if (key === 'signedin') return JSON.parse(localStorage.getItem(key)) || false;
  return JSON.parse(localStorage.getItem(key)) || [];
}

/**
 * Updates the database with the new provided cart Array
 *
 * @param {Array} newCart the array of the new cart items to sync to database
 * @return {null}
 */
const syncLocalStorage = async function (newCart = getLocalStorage(), merge = false) {
  let mergeQuery = '';
  if (merge === true) {
    mergeQuery = '?merge=true';
  }
  try {
    const res = await axios.post(`${window.location.origin}/user/updateCart${mergeQuery}`,
      {
        data: {
          newCart,
        },
      });
    /* if its not a merge request (merge === false) the updates necessary would have been
     * performed prior to this function and this step would not be needed
     */
    if (merge === true) {
      updateCart(res.data, { sync: false });
    }
  } catch (err) {
    console.warn(err);
  }
};

const calcTotalPrice = function (items = getLocalStorage('cartItems')) {
  let total = items.reduce((prevValue, item) => prevValue + (item.count * item.price), 0);
  total = total.toFixed(2);
  return total;
};

const updateSignin = function () {
  if (Cookies.get('signedin') === 'true') {
    localStorage.setItem('signedin', 'true');
  } else {
    localStorage.setItem('signedin', 'false');
  }
};


export {
  updateCart,
  updateTotalCount,
  syncLocalStorage,
  getLocalStorage,
  calcTotalPrice,
};
