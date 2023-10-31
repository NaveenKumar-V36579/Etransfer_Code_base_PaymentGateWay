import axios from "axios";

//  PROD 
//export const API_BASE ="https://continuemycoverage.aflac.com/"; 
export const IFRAME_URL_CC = `https://aflaciframe-pp-prtl.spectrumretailnet.com/PP?PAGE=HOSTEDPAYMENT&SESSIONID=`;

// DEV 
// export const API_BASE = "https://continuemycoverage-dev-api.aws.nonprod.aflac.com/";
// export const IFRAME_URL_CC = "https://aflaciframe-pp-prtldev.spectrumretailnet.com/PP?PAGE=HOSTEDPAYMENT&SESSIONID=";

//QA 
export const API_BASE = "https://continuemycoverage-qa-api.aws.nonprod.aflac.com/";
//export const IFRAME_URL_CC = `https://aflaciframe-pp-prtlqa.spectrumretailnet.com/PP?PAGE=HOSTEDPAYMENT&SESSIONID=`;

 

//Get Products
export async function getProducts(id, successCallback, failureCallback) {
  try {
    const res = await axios.get(
      API_BASE + "api/DigitalSixCode/Get?token=" + id
    );
    successCallback(res);
  } catch (error) {
    failureCallback(error);
  }
}

//Update Initial Checks
export async function updateInitialChecks(data){
  try{
    await axios.post(
      API_BASE + "api/InitialChecks/UpdateInitialChecks",data
    );
  }
  catch(error)
  {}
}

//Post Products
export async function saveInsureCoverage(
  data,
  successCallback,
  failureCallback
) {
  
  try {
    const res = await axios.post(
      API_BASE + "api/Payment/PostOrderDetails",
      data
    );
    successCallback(res);
  } catch (error) {
    failureCallback(error);
  }
}

//Paymetric Card Validation
export async function validateCard(data, successCallback, failureCallback) {
  try {
    const res = await axios.post(API_BASE + "api/DigitalSixCode", data);
    successCallback(res);
  } catch (error) {
    failureCallback(error);
  }
}

//Post Policies
export async function UpdateSelectedPolicies(data) {
  try {
    const res = await axios.post(
      API_BASE + "api/AuditTrail/UpdateSelectedPolicies",
      data
    );
  } catch (error) {}
}

//Update Payment Type in AuditTrail
export async function updatePaymentType(value,token){
  try{
    await axios.get(
      API_BASE+"api/AuditTrail/UpdatePaymentType?value="+value+"&token="+token
    );
  }
  catch(error){}
}

//To get Reptoken response
export async function getRepTokenResponse(
  repToken,
  token,
  successCallback,
  failureCallback
  ){
  try {
    const res = await axios.post(
      API_BASE + "api/CreditCardInfo/SaveAndFetchInfo",
      {
        "RepTokenResponse" : repToken,
        "Token" : token,
      }
    );
    successCallback(res);
  } catch (error) {
    failureCallback(error);
  }
}

export async function getRepTokenResponseForACH(
  repToken,
  token,
  successCallback,
  failureCallback
  ){
  try {
    const res = await axios.post(
      API_BASE + "api/BankingInfo/SaveAndFetchInfo",
      {
        "RepTokenResponse" : repToken,
        "Token" : token,
      }
    );
    successCallback(res);
  } catch (error) {
    failureCallback(error);
  }
}

