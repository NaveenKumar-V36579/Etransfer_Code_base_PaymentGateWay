const setCurrentStep = "SET_CURRENT_STEP";
const doNotDisplay = "DO_NOT_DISPLAY";


const initialState = {
  isVisible: false,
  currentStep:{},
};

const steps = [
  {
    stepNum: 1,
    stepName: "Product Selection",
    isCurrentStep: false,
    navigateTo: "productSelection",
  },
  {
    stepNum: 2,
    stepName: "Payment Selection",
    isCurrentStep: false,
    navigateTo: "cardSelection",
  },
  {
    stepNum: 3,
    stepName: "Payment and Billing",
    isCurrentStep: false,
    navigateTo: "addressBillingInfo",
  },

  {
    stepNum: 4,
    stepName: "Terms and Conditions",
    isCurrentStep: false,
    navigateTo: "authorize",
  },
  
  {
    stepNum: 5,
    stepName: "Review & Submit",
    isCurrentStep: false,
    navigateTo: "productSelection",
  }
];

export const actionCreators = {
  setCurrentStep: (payload) => ({ type: setCurrentStep, payload }),
  doNotDisplay: () => ({ type: doNotDisplay }),
};

export const reducer = (state, action) => {
  state = state || initialState;
  const currentStep = steps.find((step) => step.stepNum === action.payload);
  const payment_mode = sessionStorage.getItem("Mode_Payment");
  if(currentStep!==undefined && payment_mode!==null && action.payload === 3 ){
    currentStep.navigateTo = (payment_mode === "BANK" )?"addressBillingInfoACH":"addressBillingInfo";
  }

  if (action.type === setCurrentStep) {
   
    return {
      ...state,
      currentStep: {
        ...currentStep,
        isCurrentStep: currentStep != null ? true : false,
      },
      steps,
      isVisible: currentStep != null ? true : false,
    };
  }

  if (action.type === doNotDisplay) {
    return {
      ...state,
      isVisible: false,
    };
  }

  return state;
};
