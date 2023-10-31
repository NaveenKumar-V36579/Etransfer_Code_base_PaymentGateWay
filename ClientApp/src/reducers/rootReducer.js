import generic from './generic-reducer';
import productReducer from './product-reducer';
import purchaseHistoryReducer from './purchase-history-reducer';
import apiReducer from './api-reducer';
import billingReducer from './billing-reducer';


const reducers = {
    
    ui : generic,
    product: productReducer,
    purchaseHistory: purchaseHistoryReducer,
    billing:billingReducer,
    api:apiReducer,
    
  };

  export default reducers;