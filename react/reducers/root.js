import { combineReducers } from 'redux';
import user from './user';
import products from './products';
import cart from './cart';

export default combineReducers({
  user,
  products,
  cart,
});
