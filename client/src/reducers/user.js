const defaultState = {};

export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      const user = action.payload;
      user.active = true;
      return {
        ...state,
        ...user,
      };

    case 'SIGNOUT':
      return {
        ...state,
        active: false,
      };
    default: return state;
  }
};
