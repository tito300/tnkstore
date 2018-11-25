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
      const userSignedout = { active: false };
      return {
        ...state,
        user: userSignedout,
      };
    default: return state;
  }
};
