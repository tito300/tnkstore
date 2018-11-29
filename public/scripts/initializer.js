import { updateCart, getLocalStorage } from './localStorageMethods.js';

/**
 *  initializes state in localStorage:
 *  1 - sets signin state to true or false
 *  2 - sets merge state
 *  3 - updates cart state based on values set above
 *
 *  @returns null
 */

export default function init() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  if (Cookies.get('signedin') === 'true') {
    localStorage.setItem('signedin', 'true');

    /* if user has just signedin it makes sure to send merge updateCart requests */
    let merge = localStorage.getItem('merge');
    switch (merge) {
      case 'null' || undefined:
        merge = 'true';
        break;
      case 'true':
        merge = 'false';
        break;
      default: break;
    }

    localStorage.setItem('merge', merge);

    merge = (merge === 'true');
    updateCart(getLocalStorage(), { merge });
  } else {
    localStorage.setItem('signedin', 'false');
    localStorage.setItem('merge', 'null');

    updateCart(getLocalStorage(), { sync: false });
  }
}
