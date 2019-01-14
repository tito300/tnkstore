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
      const cartItems = [...state.cartItems];
      let { item } = action
    
      const indexInCart = cartItems.findIndex(item1 => item1.id === item.id);
      if (indexInCart !== -1) {
          cartItems[indexInCart] = { ...cartItems[indexInCart] };
          cartItems[indexInCart].count++;
          cartItems[indexInCart].color = action.options.color;
          cartItems[indexInCart].gender = action.options.gender;
          cartItems[indexInCart].size = action.options.size;
      } else {
          const {
            title, id, price, photo,
          } = item;
          const newCartItem = {
            count: 1,
            name: title,
            id,
            price,
            img: photo,
            color: action.options.color,
            size: action.options.size,
            gender: action.options.gender,
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
