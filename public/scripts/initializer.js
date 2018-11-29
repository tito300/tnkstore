import { updateCart, getLocalStorage } from './localStorageMethods.js';

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
