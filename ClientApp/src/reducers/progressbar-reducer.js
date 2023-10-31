import {
    SET_CURRENT_STEP,
    DO_NOT_DISPLAY
} from '../actions/progressbar'

const initialState = {
    isVisible: false,
    currentStep : {},
    
};

const steps = [
    {
        stepNum: 1,
        stepName: "Product Selection",
        isCurrentStep: false,
        navigateTo:"product-selection"
    },
    {
        stepNum: 2,
        stepName: "Product Review",
        isCurrentStep: false,
        navigateTo:"product-review"
    },
    {
        stepNum: 3,
        stepName: "Billing",
        isCurrentStep: false,
        navigateTo:"billing-details"
    },
    {
        stepNum: 4,
        stepName: "Review & Submit",
        isCurrentStep: false,
        navigateTo:"product-selection"
    },
]



export default function (state=initialState, action){
    switch (action.type) {
        case SET_CURRENT_STEP:{
            const currentStep = steps.find(step => step.stepNum === action.payload);
            return {
                ...state,
                currentStep: {
                    ...currentStep,
                    isCurrentStep: currentStep !=null?true:false,
                },
                steps,
                isVisible: currentStep !=null?true:false,
                
            }
        }

        case DO_NOT_DISPLAY:{
            return {
                ...state,
                isVisible: false,
                
            }
        }

        default:
        return state;
    }
   

};
