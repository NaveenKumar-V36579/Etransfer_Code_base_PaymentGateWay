import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createForms } from 'react-redux-form';
import * as progressBar from './progressbarReducer';
import * as products from './productReducer';
import * as billing from './billingReducer';
import * as header from './headerReducer';
import * as landing from './landingReducer';

export default function configureStore(history, initialState) {
  const middleware = [thunk, routerMiddleware(history)];

  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (
    isDevelopment &&
    typeof window !== 'undefined' &&
    window.devToolsExtension
  ) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    routing: routerReducer,
    progressBar: progressBar.reducer,
    product: products.reducer,
    billing: billing.reducer,
    header: header.reducer,
    landing: landing.reducer,
    ...createForms({
      billingForm: billing.formInitialState
    })
  });

  return createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
}
