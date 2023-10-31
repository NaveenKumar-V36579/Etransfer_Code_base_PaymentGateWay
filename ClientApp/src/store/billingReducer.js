//import { addDays } from 'date-fns';

const GET_BILLING_YEARS = 'GET_BILLING_YEARS';
const SET_HOME_ADDRESS = 'SET_HOME_ADDRESS';
const SET_PAYMENT_TOKEN = 'SET_PAYMENT_TOKEN';
const SET_CLEAR_ALL = 'SET_CLEAR_ALL';

export const initialState = {
    billingMethods: [
        {
            label: 'Select Payment type',
            value: '0'
        },
        {
            label: 'Checking Account',
            value: '3'
        },
        {
            label: 'Savings Account',
            value: '4'
        }
    ],
    cardTypes: [
        {
            label: 'Visa',
            value: 'VISA'
        },
        {
            label: 'MasterCard',
            value: 'MC'
        }
    ],
    accountTypes: [
        {
            label: 'Personal',
            value: '1'
        },
        {
            label: 'Business',
            value: '2'
        }
    ],
    billingMonths: [
        {
            label: 'January',
            value: '01'
        },
        {
            label: 'February',
            value: '02'
        },
        {
            label: 'March',
            value: '03'
        },
        {
            label: 'April',
            value: '04'
        },
        {
            label: 'May',
            value: '05'
        },
        {
            label: 'June',
            value: '06'
        },
        {
            label: 'July',
            value: '07'
        },
        {
            label: 'August',
            value: '08'
        },
        {
            label: 'September',
            value: '09'
        },
        {
            label: 'October',
            value: '10'
        },
        {
            label: 'November',
            value: '11'
        },
        {
            label: 'December',
            value: '12'
        }
    ],
    billingStates: [
        {
            label: 'Alabama',
            value: 'AL'
        },
        {
            label: 'Alaska',
            value: 'AK'
        },
        {
            label: 'American Samoa',
            value: 'AS'
        },
        {
            label: 'Arizona',
            value: 'AZ'
        },
        {
            label: 'Arkansas',
            value: 'AR'
        },
        {
            label: 'California',
            value: 'CA'
        },
        {
            label: 'Colorado',
            value: 'CO'
        },
        {
            label: 'Connecticut',
            value: 'CT'
        },
        {
            label: 'Delaware',
            value: 'DE'
        },
        {
            label: 'District of Columbia',
            value: 'DC'
        },
        {
            label: 'Florida',
            value: 'FL'
        },
        {
            label: 'Georgia',
            value: 'GA'
        },
        {
            label: 'Guam',
            value: 'GU'
        },
        {
            label: 'Hawaii',
            value: 'HI'
        },
        {
            label: 'Idaho',
            value: 'ID'
        },
        {
            label: 'Illinois',
            value: 'IL'
        },
        {
            label: 'Indiana',
            value: 'IN'
        },
        {
            label: 'Iowa',
            value: 'IA'
        },
        {
            label: 'Kansas',
            value: 'KS'
        },
        {
            label: 'Kentucky',
            value: 'KY'
        },
        {
            label: 'Louisiana',
            value: 'LA'
        },
        {
            label: 'Maine',
            value: 'ME'
        },
        {
            label: 'Marshall Islands',
            value: 'MH'
        },
        {
            label: 'Maryland',
            value: 'MD'
        },
        {
            label: 'Massachusetts',
            value: 'MA'
        },
        {
            label: 'Michigan',
            value: 'MI'
        },
        {
            label: 'Micronesia',
            value: 'FM'
        },
        {
            label: 'Minnesota',
            value: 'MN'
        },
        {
            label: 'Mississippi',
            value: 'MS'
        },
        {
            label: 'Missouri',
            value: 'MO'
        },
        {
            label: 'Montana',
            value: 'MT'
        },
        {
            label: 'Nebraska',
            value: 'NE'
        },
        {
            label: 'Nevada',
            value: 'NV'
        },
        {
            label: 'New Hampshire',
            value: 'NH'
        },
        {
            label: 'New Jersey',
            value: 'NJ'
        },
        {
            label: 'New Mexico',
            value: 'NM'
        },
        {
            label: 'New York',
            value: 'NY'
        },
        {
            label: 'North Carolina',
            value: 'NC'
        },
        {
            label: 'North Dakota',
            value: 'ND'
        },
        {
            label: 'Northern Marianas',
            value: 'MP'
        },
        {
            label: 'Ohio',
            value: 'OH'
        },
        {
            label: 'Oklahoma',
            value: 'OK'
        },
        {
            label: 'Oregon',
            value: 'OR'
        },
        {
            label: 'Palau',
            value: 'PW'
        },
        {
            label: 'Pennsylvania',
            value: 'PA'
        },
        {
            label: 'Puerto Rico',
            value: 'PR'
        },
        {
            label: 'Rhode Island',
            value: 'RI'
        },
        {
            label: 'South Carolina',
            value: 'SC'
        },
        {
            label: 'South Dakota',
            value: 'SD'
        },
        {
            label: 'Tennessee',
            value: 'TN'
        },
        {
            label: 'Texas',
            value: 'TX'
        },
        {
            label: 'Utah',
            value: 'UT'
        },
        {
            label: 'Vermont',
            value: 'VT'
        },
        {
            label: 'Virgin Islands',
            value: 'VI'
        },
        {
            label: 'Virginia',
            value: 'VA'
        },
        {
            label: 'Washington',
            value: 'WA'
        },
        {
            label: 'West Virginia',
            value: 'WV'
        },
        {
            label: 'Wisconsin',
            value: 'WI'
        },
        {
            label: 'Wyoming',
            value: 'WY'
        }
    ],
    billingYears: [],
    homeAddress: {
        addressLine1: '123',
        addressLine2: '1345',
        city: '23452',
        state: {
            label: 'Wyoming',
            value: 'WY'
        },
        zipCode: '12345'
    },
    paymentToken: ''
};

export const formInitialState = {
    billingInformation: {
        address: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: null,
            zipCode: ''
        }
    },
    paymentInformation: {
        paymentMethod: {
            label: 'Select Payment type',
            value: '0'
        },
        card: {
            cardType: null,
            cardNumber: '',
            cardName: '',
            cvv: '',
            month: '',
            year: '',
            draftDate: null
        },
        bank: {
            bankName: '',
            bankHolderName: '',
            address: {
                bankCity: '',
                bankState: null,
                bankZipCode: ''
            },
            accountType: null,
            routingNumber: '',
            accountNumber: '',
            bankDraftDate: null
        }
    }
};

export const actionCreators = {
    getBillingYears: () => ({ type: GET_BILLING_YEARS }),
    setHomeAddress: payload => ({ type: SET_HOME_ADDRESS, payload }),
    setPaymentToken: payload => ({ type: SET_PAYMENT_TOKEN, payload }),
    clearBillingInfo: () =>({ type: SET_CLEAR_ALL}),
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BILLING_YEARS: {
            const billingYearList = [];
            for (var i = 0; i < 12; i++) {
                billingYearList.push({
                    label: (new Date().getFullYear() + i).toString(),
                    value: (new Date().getFullYear() + i).toString()
                });
            }
            return {
                ...state,
                billingYears: billingYearList
            };
        }
        case SET_HOME_ADDRESS: {
            const stateObject = state.billingStates.find(
                object => object.value === action.payload.state
            );
            return {
                ...state,
                homeAddress: {
                    addressLine1: action.payload.addressLine1
                        ? action.payload.addressLine1
                        : '',
                    addressLine2: action.payload.addressLine2
                        ? action.payload.addressLine2
                        : '',
                    city: action.payload.city,
                    state: stateObject,
                    zipCode: action.payload.zipCode
                }
            };
        }
        case SET_PAYMENT_TOKEN: {
            return {
                ...state,
                paymentToken: action.payload.token
            };
        }
        case SET_CLEAR_ALL: {

            return{
                ...state,
                billingInformation: {
                    address: {
                        addressLine1: '',
                        addressLine2: '',
                        city: '',
                        state: null,
                        zipCode: ''
                    }
                },
                paymentInformation: {
                    paymentMethod: {
                        label: 'Checking Account',
                        value: '1'
                    },
                    card: {
                        cardType: null,
                        cardNumber: '',
                        cardName: '',
                        cvv: '',
                        month: '',
                        year: '',
                        draftDate: null
                    },
                    bank: {
                        bankName: '',
                        bankHolderName: '',
                        address: {
                            bankCity: '',
                            bankState: null,
                            bankZipCode: ''
                        },
                        accountType: null,
                        routingNumber: '',
                        accountNumber: '',
                        bankDraftDate: null
                    }
                }
            };
        }
        default: {
            return state;
        }
    }
};

export const termsAndConditions =
    'I authorize Aflac to initiate recurring debit entries or charges electronically to the account indicated above for the premiums due on my policy(-ies). I authorize the institution to debit or charge same to the account. I agree this authorization shall remain effective and in full force until Aflac and the institution receive written notification from me of its termination in such time and in such manner to afford Aflac and the institution a reasonable opportunity to act on it. I authorize Aflac to continue to initiate recurring debit entries or charges to the account beyond the expiration date of the debit or credit card and to automatically update the card information as necessary to continue initiating debit entries or charges.';

export const termsAndConditions2 = 'I acknowledge and agree I provided the account information or presented the credit or debit card referenced above. I represent I own the account or have legal authority to use the account or card referenced above. I agree to indemnify Aflac, hold Aflac harmless, and defend Aflac against any and all Losses arising out of or related to allegations I did not own the account or did not have legal authority to use the account or card referenced above. Losses include damages, liabilities, deficiencies, claims, actions, judgments, settlements, interest, awards, penalties, fines, costs, and/or expenses of whatever kind, including reasonable attorneys’ fees, that are incurred by Aflac.';
