const SET_CUSTOMER_ID = 'SET_CUSTOMER_ID';
const SET_CUSTOMER_NAME = 'SET_CUSTOMER_NAME';
const SET_AUTH_ERROR_MESSAGE = 'SET_AUTH_ERROR_MESSAGE';
const GET_AUTH_ERROR_MESSAGE = 'GET_AUTH_ERROR_MESSAGE';

export const actionCreators = {
  setCustomerId: payload => ({ type: SET_CUSTOMER_ID, payload }),
  setCustomerName: payload => ({ type: SET_CUSTOMER_NAME, payload }),
  setAuthErrorMessage: payload => ({type:SET_AUTH_ERROR_MESSAGE,payload}),
  getAuthErrorMessage:()=>({type:GET_AUTH_ERROR_MESSAGE})
};

const initialState = {
  customerId: '',
  customerName: '',
  authErrorMessage:''
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CUSTOMER_ID: {
      return {
        ...state,
        customerId: action.payload.customerId
      };
    }
    case SET_CUSTOMER_NAME: {
      return {
        ...state,
        customerName: action.payload.name
      };
    }
    case SET_AUTH_ERROR_MESSAGE: {
      return {
        ...state,
        authErrorMessage: action.payload.authErrorMessage
      };
    }
      case GET_AUTH_ERROR_MESSAGE: {
        return {
          ...state,
        };
    }
    default: {
      return state;
    }
  }
};
