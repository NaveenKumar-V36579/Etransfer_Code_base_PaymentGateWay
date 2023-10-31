import { apiAction } from '../middleware/apiAction';

export const API_GET_PRODUCTS="API_GET_PRODUCTS";
export const API_GET_PRODUCTS_COMPLETED="API_GET_PRODUCTS_COMPLETED";
export const API_GET_PRODUCTS_ERROR="API_GET_PRODUCTS_ERROR";

export const CALCULATE_TOTAL_AMOUNT = "CALCULATE_TOTAL_AMOUNT";
export const CHANGE_SELECTED = "CHANGE_SELECTED";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";


export function getProducts() {
  return apiAction({
    path: "api/product",
    currentAction: APIGetProducts,
    onSuccess: APIGetProductsCompleted,
    onFailure: APIGetProductsError,
    
  });
}

function APIGetProducts(){
  return{
    type:API_GET_PRODUCTS
  }
}

function APIGetProductsCompleted(data) {
  return {
    type: API_GET_PRODUCTS_COMPLETED,
    payload: data
  };
}

function APIGetProductsError(error){
    return{
        type:API_GET_PRODUCTS_ERROR,
        payload:error
    }
}


export const actionCreators = {
  getProducts: getProducts,
  calculateTotalAmount: () => ({ type: CALCULATE_TOTAL_AMOUNT }),
  changeSelected: (productId, selected) => ({
    type: CHANGE_SELECTED,
    payload: { productId, selected }
  }),
  addToCart: () => ({ type: ADD_TO_CART }),
  removeItemFromCart: cartID => ({ type: REMOVE_ITEM_FROM_CART, payload: cartID })
};


