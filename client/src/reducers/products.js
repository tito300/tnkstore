export default (state = { all: [] }, action) => {
  switch (action.type) {
    case 'POPULATE_PRODUCTS':
      return {
        ...state,
        all: action.products,
      };
    default: return state;
  }
};
