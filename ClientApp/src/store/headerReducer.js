const showCart = 'SHOW_CART';
const hideCart = 'HIDE_CART';

const initialState = {
  isCartVisible: true
};

export const actionCreators = {
  showCart: () => ({ type: showCart }),
  hideCart: () => ({ type: hideCart })
};

export const reducer = (state, action) => {
  state = state || initialState;
  switch (action.type) {
    case showCart:
      return {
        isCartVisible: true
      };

    case hideCart:
      return {
        isCartVisible: false
      };

    default: {
      return state;
    }
  }
};
