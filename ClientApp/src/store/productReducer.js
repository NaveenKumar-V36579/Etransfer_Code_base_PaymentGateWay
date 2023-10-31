import moment from 'moment';
const SET_PRODUCTS = 'SET_PRODUCTS';
const CALCULATE_TOTAL_AMOUNT = 'CALCULATE_TOTAL_AMOUNT';
const CHANGE_SELECTED = 'CHANGE_SELECTED';
const ADD_TO_CART = 'ADD_TO_CART';
const CALCULATE_TOTAL_DUE_AMOUNT = 'CALCULATE_TOTAL_DUE_AMOUNT';
const CLEAR_CART = 'CLEAR_CART';
const CHANGE_FREQUENCY = 'CHANGE_FREQUENCY';
const SET_DUE_DATE = 'SET_DUE_DATE';
const SET_IFRAME_RESPONSE = 'SET_IFRAME_RESPONSE';
const SET_PAYMENT_MODE = 'SET_PAYMENT_MODE';
const SET_DRAFT_DATE = 'SET_DRAFT_DATE';
const SET_IFRAME_ACH_RESPONSE = 'SET_IFRAME_ACH_RESPONSE';


const initialState = {
  products: { policies: [] },
  totalRecurringAmount: 0,
  totalDueAmount: 0,
  cartCount: 0,
  cartItems: [],
  recurringFrequency: 'Monthly',
  paymentFrequency: [
    {
      value: 'Monthly',
      label: 'Monthly'
    },
    {
      value: 'Quarterly',
      label: 'Quarterly'
    }
  ],
  dueDate: null,
  iframeResponse:{},
  paymentMode:null,
  draftDate: null,
  iframeACHResponse:{}
};

export const actionCreators = {
  setProducts: payload => ({ type: SET_PRODUCTS, payload }),
  calculateTotalAmount: () => ({ type: CALCULATE_TOTAL_AMOUNT }),
  changeSelected: (productId, selected) => ({
    type: CHANGE_SELECTED,
    payload: { productId, selected }
  }),
  addToCart: () => ({ type: ADD_TO_CART }),
  clearCart: () => ({ type: CLEAR_CART }),
  changeRecurringFrequency: newRecurringFrequency => ({
    type: CHANGE_FREQUENCY,
    payload: newRecurringFrequency
  }),
  calculateTotalDueAmount: () => ({ type: CALCULATE_TOTAL_DUE_AMOUNT }),
  setDueDate: payload => ({ type: SET_DUE_DATE, payload }),
  setIframeResponse: payload => ({type: SET_IFRAME_RESPONSE,payload}),
  setPaymentMode: payload => ({type: SET_PAYMENT_MODE,payload}),
  setDraftDate: payload => ({type: SET_DRAFT_DATE,payload}),
  setIframeACHResponse: payload => ({type: SET_IFRAME_ACH_RESPONSE,payload}),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS: {
      return {
        ...state,
        products: { policies: action.payload.data.policies }
      };
    }
      case CALCULATE_TOTAL_AMOUNT: {
      const calculatedAmt = state.products.policies.reduce(
        (accumulator, product) => {
          if (product.selected === true) {
            return state.recurringFrequency === 'Monthly'
              ? parseFloat(product.recurringAmountMonthly) + accumulator
              : parseFloat(product.recurringAmountQuarterly) + accumulator;
          } else {
            return accumulator;
          }
        },
        0
      );

      return {
        ...state,
        totalRecurringAmount: calculatedAmt.toFixed(2)
      };
    }
    case CHANGE_SELECTED: {
      const selectedProductIndex = state.products.policies.findIndex(
        product => product.id === action.payload.productId
      );
      state.products.policies[selectedProductIndex].selected =
        action.payload.selected;
      return {
        ...state,
        products: {
          ...state.products,
          policies: [...state.products.policies]
        }
      };
    }
    case ADD_TO_CART: {
      const selectedProducts = state.products.policies.filter(
        product => product.selected === true
      );

      return {
        ...state,
        cartCount: selectedProducts.length,
        cartItems: [...selectedProducts]
      };
    }
    case CLEAR_CART: {
      return {
        ...state,
        products: { policies: [] },
        totalRecurringAmount: 0,
        totalDueAmount: 0,
        cartCount: 0,
        cartItems: [],
        recurringFrequency: ''
      };
    }
    case CHANGE_FREQUENCY: {
      return {
        ...state,
        recurringFrequency: action.payload
      };
    }
    case SET_IFRAME_RESPONSE:{
      return{
        ...state,
        iframeResponse:action.payload
      };
    }
    case SET_PAYMENT_MODE:{
      return{
        ...state,
        paymentMode:action.payload
      };
    }
    case CALCULATE_TOTAL_DUE_AMOUNT: {
      const calculatedAmt = state.products.policies.reduce(
        (accumulator, product) => {
          if (product.selected === true) {
            return parseFloat(product.dueToday) + accumulator;
          } else {
            return accumulator;
          }
        },
        0
      );
      return {
        ...state,
        totalDueAmount: calculatedAmt.toFixed(2)
      };
    }
      case SET_DUE_DATE: {
      return {
        ...state,
          dueDate: moment(action.payload).format('MM/DD/YYYY')
      };
    }
    case SET_DRAFT_DATE: {
      return {
        ...state,
          draftDate: moment(action.payload).format('MM/DD/YYYY')
      };
    }
    case SET_IFRAME_ACH_RESPONSE:{
      return{
        ...state,
        iframeACHResponse:action.payload
      };
    }
    default: {
      return state;
    }
  }
};
