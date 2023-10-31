import {GET_PURCHASE_HISTORY} from '../actions/purchasehistory';


const initialState = {
    purchaseItems:[],
    totalAmount:0,
    
};

const purchaseList = [
    {
        id: 1,
        ProductName: "Critical Illness",
        ProductDescription: "Criticall Illness Description",
        Amount: 100.25,
        selected:false,
        PolicyNumber: "A12394839",
        CoverageType:"Family",
        PaymentFrequency:"Monthly",
        PastDue:160.20,
        CurrentDue:160.20,
        ExtraPayment:0
    },
    {
        id: 2,
        ProductName: "Accident",
        ProductDescription: "Accident Insurance Description",
        Amount:80.65,
        selected:false,
        PolicyNumber: "A29849493",
        CoverageType:"Family",
        PaymentFrequency:"Monthly",
        PastDue:0,
        CurrentDue:81.65,
        ExtraPayment:0
    }, 
    {
        id: 3,
        ProductName: "Cancer",
        ProductDescription: "Cancer Insurance Description",
        Amount:70.45,
        selected:false,
        PolicyNumber: "A32103959",
        CoverageType:"Individual",
        PaymentFrequency:"Monthly",
        PastDue:0,
        CurrentDue:70.45,
        ExtraPayment:0
    },
]



export default function(state=initialState, action)  {
    
    switch (action.type) {
        case GET_PURCHASE_HISTORY:{
            return {
                ...state,
              purchaseItems:purchaseList
                
            }
        }

        default:
        return state;
    }
    
  
};
