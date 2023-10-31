import {
  API_START,
  API_END,
  API_ERROR
} from "../actions/api";


const initState={
  isLoadingData:false,
  errorFromApi:{},
  errorToDisplay:{},
  authToken:""
}

export default function(state = initState, action) {
  
  switch (action.type) {

    
    case API_START:
      
        return {
          ...state,
          isLoading: true
        };
      
      
    case API_END:
      
        return {
          ...state,
          isLoading: false
        };

        case API_ERROR:
      
          return {
            ...state,
            errorFromApi: action.payload
          };
      
    
      
    default:
      return state;
  }
}
