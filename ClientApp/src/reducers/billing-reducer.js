import {
  GET_BILLING_MONTHS,
  GET_ACCOUNT_TYPES,
  GET_BILLING_OPTIONS,
  GET_BILLING_STATES,
  GET_BILLING_YEARS,
  GET_CREDIT_CARD_OPTIONS,
  SET_PAYMENT_TYPE,
  SET_SELECTED_DATE,
  SET_CLEAR_ALL,
 } from '../actions/billing';

const initialState = {
  billings: [],
  creditCards: [],
  billingMonths: [],
  billingYears: [],
  currentPaymentInfo: {
    cardType: "VISA",
    cardNumber: "************1111",
    expiryDate: "12/30"
  },
  selectedPaymentType: 1,
  billingStates: [],
  accountTypes:[],
  selectedDate:new Date()
};

const creditCardTypes = [
  {
    title: "Select ...",
    key: "0"
  },
  {
    title: "Visa",
    key: "VISA"
  },
  {
    title: "MasterCard",
    key: "MC"
  }
];
const billingMethods = [
  {
    title: "Select Payment Method...",
    key: "0"
  },
  {
    title: "Credit/Debit Card",
    key: "1"
  },
  {
    title: "Checking Account",
    key: "2"
  },
  {
    title: "Savings Account",
    key: "3"
  }
];

const accountTypeList = [
  {
    title:"Select...",
    key:"0"
  },
  {
    title:"Personal",
    key:"1"
  },
  {
    title:"Business",
    key:"2"
  }
]

const billingMonthList = [
  {
    title: "Select Month...",
    key: "0"
  },
  {
    title: "01-January",
    key: "01"
  },
  {
    title: "02-February",
    key: "02"
  },
  {
    title: "03-March",
    key: "03"
  },
  {
    title: "04-April",
    key: "05"
  },
  {
    title: "05-May",
    key: "05"
  },
  {
    title: "06-June",
    key: "06"
  },
  {
    title: "07-July",
    key: "07"
  },
  {
    title: "08-August",
    key: "08"
  },
  {
    title: "09-September",
    key: "09"
  },
  {
    title: "10-October",
    key: "10"
  },
  {
    title: "11-November",
    key: "11"
  },
  {
    title: "12-December",
    key: "12"
  }
];

const billingYearList = [
  {
    title: "Year...",
    key: "0"
  }
];

const stateList = [
  {
    title: "Select...",
    key: "0"
  },
  {
    title: "Alabama",
    key: "AL"
  },
  {
    title: "Alaska",
    key: "AK"
  },
  {
    title: "American Samoa",
    key: "AS"
  },
  {
    title: "Arizona",
    key: "AZ"
  },
  {
    title: "Arkansas",
    key: "AR"
  },
  {
    title: "California",
    key: "CA"
  },
  {
    title: "Colorado",
    key: "CO"
  },
  {
    title: "Connecticut",
    key: "CT"
  },
  {
    title: "Delaware",
    key: "DE"
  },
  {
    title: "District of Columbia",
    key: "DC"
  },
  {
    title: "Florida",
    key: "FL"
  },
  {
    title: "Georgia",
    key: "GA"
  },
  {
    title: "Georgia",
    key: "GA"
  },

  {
    title: "Guam",
    key: "GU"
  },
  {
    title: "Hawaii",
    key: "HI"
  },
  {
    title: "Idaho",
    key: "ID"
  },
  {
    title: "Illinois",
    key: "IL"
  },
  {
    title: "Indiana",
    key: "IN"
  },
  {
    title: "Iowa",
    key: "IA"
  },
  {
    title: "Kansas",
    key: "KS"
  },
  {
    title: "Kentucky",
    key: "KY"
  },
  {
    title: "Louisiana",
    key: "LA"
  },
  {
    title: "Maine",
    key: "ME"
  },
  {
    title: "Marshall Islands",
    key: "MH"
  },
  {
    title: "Maryland",
    key: "MD"
  },
  {
    title: "Massachusetts",
    key: "MA"
  },
  {
    title: "Michigan",
    key: "MI"
  },
  {
    title: "Micronesia",
    key: "FM"
  },
  {
    title: "Minnesota",
    key: "MN"
  },
  {
    title: "Mississippi",
    key: "MS"
  },
  {
    title: "Missouri",
    key: "MO"
  },
  {
    title: "Montana",
    key: "MT"
  },
  {
    title: "Nebraska",
    key: "NE"
  },
  {
    title: "Nevada",
    key: "NV"
  },
  {
    title: "New Hampshire",
    key: "NH"
  },
  {
    title: "New Jersey",
    key: "NJ"
  },
  {
    title: "New Mexico",
    key: "NM"
  },
  {
    title: "New York",
    key: "NY"
  },
  {
    title: "North Carolina",
    key: "NC"
  },
  {
    title: "North Dakota",
    key: "ND"
  },
  {
    title: "Northern Marianas",
    key: "MP"
  },
  {
    title: "Ohio",
    key: "OH"
  },
  {
    title: "Oklahoma",
    key: "OK"
  },
  {
    title: "Oregon",
    key: "OR"
  },
  {
    title: "Palau",
    key: "PW"
  },
  {
    title: "Pennsylvania",
    key: "PA"
  },
  {
    title: "Puerto Rico",
    key: "PR"
  },
  {
    title: "Rhode Island",
    key: "RI"
  },
  {
    title: "South Carolina",
    key: "SC"
  },
  {
    title: "South Dakota",
    key: "SD"
  },
  {
    title: "Tennessee",
    key: "TN"
  },
  {
    title: "Texas",
    key: "TX"
  },
  {
    title: "Utah",
    key: "UT"
  },
  {
    title: "Vermont",
    key: "VT"
  },
  {
    title: "Virgin Islands",
    key: "VI"
  },
  {
    title: "Virginia",
    key: "VA"
  },
  {
    title: "Washington",
    key: "WA"
  },
  {
    title: "West Virginia",
    key: "WV"
  },
  {
    title: "Wisconsin",
    key: "WI"
  },
  {
    title: "Wyoming",
    key: "WY"
  }
];



export default function (state, action) {
  state = state || initialState;
  switch (action.type) {
    case GET_BILLING_OPTIONS:
      return {
        ...state,
        billings: billingMethods
      };

    case GET_CREDIT_CARD_OPTIONS: {
      return {
        ...state,
        creditCards: creditCardTypes
      };
    }

    case GET_BILLING_MONTHS: {
      return {
        ...state,
        billingMonths: billingMonthList
      };
    }

    case GET_BILLING_YEARS: {
      var currentYear = new Date().getFullYear();
      for (var i = 0; i < 12; i++) {
        var rowData = {
          title: currentYear + i,
          key: (currentYear + i).toString().substring(2, 4)
        };
        billingYearList.push(rowData);
      }
      return {
        ...state,
        billingYears: billingYearList
      };
    }
    case SET_PAYMENT_TYPE: {
      
      return {
        ...state,
         // eslint-disable-next-line
        selectedPaymentType: parseInt(action.payload)
      };
    }
    case GET_BILLING_STATES: {
      return {
        ...state,
        billingStates: stateList
      };
    }
    case GET_ACCOUNT_TYPES:{
      return{
        ...state,accountTypes:accountTypeList
      }
    }

    case SET_SELECTED_DATE:{
      
      return{
        ...state,
        selectedDate:action.payload
      }
    }
    case SET_CLEAR_ALL:{
      return{
        ...state,
        billings: [],
        creditCards: [],
        billingMonths: [],
        billingYears: [],
        currentPaymentInfo: {
          cardType: "VISA",
          cardNumber: "************1111",
          expiryDate: "12/30"
        },
        selectedPaymentType: 1,
        billingStates: [],
        accountTypes:[],
        selectedDate:new Date()
      }
    }
    default: {
      return state;
    }
  }
};
