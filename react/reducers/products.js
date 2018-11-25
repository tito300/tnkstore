export default (state = { products: [] }, action) => {
  switch (action.type) {
    case 'POPULATE_PRODUCTS':
      return {
        ...state,
        products: action.products,
      };
    default: return state;
  }
};
