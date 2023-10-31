export const GET_BILLING_OPTIONS = "GET_BILLING_OPTIONS";
export const GET_CREDIT_CARD_OPTIONS = "GET_CREDIT_CARD_OPTIONS";
export const GET_BILLING_MONTHS = "GET_BILLING_MONTHS";
export const GET_BILLING_YEARS = "GET_BILLING_YEARS";
export const SET_PAYMENT_TYPE = "SET_PAYMENT_TYPE";
export const GET_BILLING_STATES = "GET_BILLING_STATES";
export const GET_ACCOUNT_TYPES = "GET_ACCOUNT_TYPES";
export const SET_SELECTED_DATE = "SET_SELECTED_DATE";
export const SET_CLEAR_ALL = "SET_CLEAR_ALL";

export const actionCreators = {
    getBillingMethods: () => ({ type: GET_BILLING_OPTIONS }),
    getCreditCardTypes: () => ({ type: GET_CREDIT_CARD_OPTIONS }),
    getBillingMonths: () => ({ type: GET_BILLING_MONTHS }),
    getBillingYears: () => ({ type: GET_BILLING_YEARS }),
    setPaymentTypes: paymentId => ({ type: SET_PAYMENT_TYPE, payload: paymentId }),
    getBillingStates: () => ({ type: GET_BILLING_STATES }),
    getAccountTypes:()=>({type:GET_ACCOUNT_TYPES}),
    setSelectedDate: selectedDate=>({
      type:SET_SELECTED_DATE,
      payload:selectedDate
    }),
    clearBillingInfo: ()=>({type:SET_CLEAR_ALL}),
  };