
import { apiAction } from '../middleware/apiAction';
export const API_GET_IFRAME_REPTOKEN_REQUEST ="API_GET_IFRAME_REPTOKEN_REQUEST";
export const API_GET_IFRAME_REPTOKEN_RESPONSE ="API_GET_IFRAME_REPTOKEN_RESPONSE";
export const API_GET_IFRMAE_REPTOKEN_ERROR="API_GET_IFRMAE_REPTOKEN_ERROR";


export function getIframeRepToken(repTokenResponse) {
    return apiAction({
      path: "api/CreditCardInfo/SaveAndFetchInfo",
      
      currentAction: iframeRepTokenRequest,
      onSuccess: iframeRepTokenResponse,
      onFailure: iframeRepTokenError,
      
    });
  }
  
  function iframeRepTokenRequest(){
    return{
      type:API_GET_IFRAME_REPTOKEN_REQUEST
    }
  }
  
  function iframeRepTokenResponse(data) {
    return {
      type: API_GET_IFRAME_REPTOKEN_RESPONSE,
      payload: data
    };
  }
  
  function iframeRepTokenError(error){
      return{
          type:API_GET_IFRMAE_REPTOKEN_ERROR,
          payload:error
      }
  }
  
  
  export const actionCreators = {
    getIframeRepToken: getIframeRepToken,
  };




