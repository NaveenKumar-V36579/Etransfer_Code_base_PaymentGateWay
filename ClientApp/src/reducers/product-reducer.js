import {
  API_GET_PRODUCTS,
  API_GET_PRODUCTS_COMPLETED,
  API_GET_PRODUCTS_ERROR,
  CHANGE_SELECTED,
  CALCULATE_TOTAL_AMOUNT,
  ADD_TO_CART,
  REMOVE_ITEM_FROM_CART
} from "../actions/product";

const initState = {
  products: [],
  totalAmount: 0,
  cartCount: 0,
  cartItems: [],
  error: {}
};
export default function(state = initState, action) {
  switch (action.type) {
    case API_GET_PRODUCTS: {
      return {
        ...state
      };
    }

    case API_GET_PRODUCTS_COMPLETED: {
      return {
        ...state,
        products: action.payload
      };
    }
    case API_GET_PRODUCTS_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case CALCULATE_TOTAL_AMOUNT: {
      const calculatedAmt = state.products.reduce((accumulator, product) => {
        if (product.selected === true) {
          return product.amount + accumulator;
        } else {
          return accumulator;
        }
      }, 0);

      return {
        ...state,
        totalAmount: calculatedAmt.toFixed(2)
      };
    }

    case CHANGE_SELECTED: {
      const selectedProductIndex = state.products.findIndex(
        product => product.id === action.payload.productId
      );
      state.products[selectedProductIndex].selected = action.payload.selected;
      return {
        ...state,
        products: [...state.products]
      };
    }

    case ADD_TO_CART: {
      const selectedProducts = state.products.filter(
        product => product.selected === true
      );

      return {
        ...state,
        cartCount: selectedProducts.length,
        cartItems: [...selectedProducts]
      };
    }

    case REMOVE_ITEM_FROM_CART: {
      const cartItemsAfterRemoval = state.cartItems.filter(
        item => item.id !== action.payload
      );
      const calculatedAmt = cartItemsAfterRemoval.reduce(
        (accumulator, product) => {
          if (product.selected === true) {
            return product.amount + accumulator;
          } else {
            return accumulator;
          }
        },
        0
      );
      return {
        ...state,
        cartCount: cartItemsAfterRemoval.length,
        cartItems: [...cartItemsAfterRemoval],
        totalAmount: calculatedAmt.toFixed(2)
      };
    }
    default:
      return state;
  }
}
