const initState = {
  cartItems: [
    {
      name: 'shirt-1',
      price: 19,
      id: 1,
      count: 1,
      img: '/imgs/christmas-1.jpg',
    },
    {
      name: 'shirt-2',
      price: 15,
      id: 2,
      count: 2,
      img: '/imgs/hunting-1.jpg',
    },
    {
      name: 'shirt-3',
      price: 10,
      id: 3,
      count: 1,
      img: '/imgs/coding-1.jpg',
    },
  ],
  products: [],
  user: {
    name: '',
    id: '',
    active: false,
  },
};

export default function rootReducer(state = initState, action) {
  if (action.type === 'DELETE_CART-ITEM') {
    const newCartItems = state.cartItems.filter(item => item.id !== action.id);
    return {
      ...state,
      cartItems: newCartItems,
    };
  } if (action.type === 'CHANGE_ITEM-COUNT') {
    const cartItems = [...state.cartItems];
    const newState = cartItems.map((item) => {
      const newItem = { ...item };
      if (
        newItem.name
                === action.event.target.options[action.event.target.selectedIndex].dataset.name
      ) {
        newItem.count = parseInt(action.event.target.value);
        return newItem;
      }
      return newItem;
    });
    return {
      ...state,
      cartItems: newState,
    };
  } if (action.type === 'POPULATE_PRODUCTS') {
    const products = [...action.products];
    console.log(`products to populate: ${JSON.stringify(products)}`);
    return {
      ...state,
      products,
    };
  } if (action.type === 'ADD_ITEM_TO_CART') {
    const itemFound = state.products.find(item => item.id === action.id);
    const cartItems = [...state.cartItems];
    const exists = cartItems.findIndex(item => item.id === itemFound.id);
    if (exists !== -1) {
      cartItems[exists] = { ...cartItems[exists] };
      cartItems[exists].count++;
    } else {
      const {
        title, id, price, photo,
      } = itemFound;
      const newCartItem = {
        count: 1,
        name: title,
        id,
        price,
        img: photo,
      };
      cartItems.push(newCartItem);
    }
    return {
      ...state,
      cartItems,
    };
  } if (action.type === 'LOGIN') {
    const user = action.payload;
    user.active = true;
    return {
      ...state,
      user,
    };
  } if (action.type === 'SIGNOUT') {
    const user = { active: false };
    return {
      ...state,
      user,
    };
  }

  return state;
}
