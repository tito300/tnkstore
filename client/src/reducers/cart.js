const defaultState = {
  cartItems: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'DELETE_CART-ITEM':
      const newCartItems = state.cartItems.filter(item => item.id !== action.id);
      return {
        ...state,
        cartItems: newCartItems,
      };

    case 'CHANGE_ITEM-COUNT':
      const newState = state.cartItems.map((item) => {
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

    case 'ADD_ITEM_TO_CART':
      const itemFound = action.products.find(item => item.id === action.id);
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

    case 'POPULATE_CARTITEMS':
      return {
        ...state,
        cartItems: action.data,
      };
    default: return state;
  }
};
