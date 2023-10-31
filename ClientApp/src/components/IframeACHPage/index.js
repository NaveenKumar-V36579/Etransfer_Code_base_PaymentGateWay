import React, { Component } from "react";
import { notify } from "react-notify-toast";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators as progressbarActionCreators } from "../../store/progressbarReducer";
import { actionCreators as productsActionCreators } from "../../store/productReducer";
import { getRepTokenResponseForACH,API_BASE,IFRAME_URL_CC } from "../../api/APICalls";

class IframeACHPage extends Component {
  constructor() {
    super();
    this.state = {
      sessionIdStore: "",
      isLoading: false,
      isIframeSection: false,
    };
  }

  componentDidMount() {
    if (this.props.products.policies.length < 1) {
      this.props.history.push('/loggedOut');
    }
    this.props.progressBarActions.setCurrentStep(3);
    axios
      .get(
        API_BASE + "api/IframeACH/FetchAchIFrameSessionID?token="+this.props.token
      )
      .then((response) => {
        this.setState({
          sessionIdStore: response.data.sessionId,
          isLoading: true,
          isIframeSection: true,
        });
        
        if (response.data.isSuccess) {
          window.addEventListener("message", (e) => {
            {
              if(e.data.cancel!=="true" || e.data.cancel===undefined){
                this.state.isIframeSection && this.handleSuccess(e);
              }
            }
          });
        }
        if (response.data.isSuccess === false) {
          notify.show(response.data.message, "error", 3000);
        }
          window.addEventListener("message", (e) => {
            {
              if(e.data.cancel==="true"){
                e.preventDefault();
                this.props.history.push("/cardSelection");
              }
            }
          });
      });
  }

  handleSuccess = (e) => {
    let result = e.data.repadddataResult;
    let repToken = result.split("?")[1];
    let validPayload = repToken !== null ? repToken.split("&")[1] : null;
    if (validPayload === "TRANSUCCESS=FALSE" && validPayload != null) {
      
    } else {
      getRepTokenResponseForACH(repToken,this.props.token, this.submitSuccess);
    }
  };

  submitSuccess = (payload) => {
    this.setState({
      isLoading: false,
    });
    this.props.productActions.setIframeACHResponse(payload.data);
     if(payload.data.repQueuedFailure === true) {
      this.submitFailure(payload)
     }else{
      this.props.history.push("/addressBillingInfoACH");
     }
     
    
  };

  submitFailure = (payload) => {
    this.setState({
      isLoading: false,
    });
    if (payload!=null){
      notify.show(
        `Please check the account details and try again. if the problem continues use a different account, select different payment method or contact the bank`,
        "error",
        8000
      );
    }else{
      notify.show(
        `There was an error submitting your form. Please try again. Technical Data:: invalid card details`,
        "error",
        3000
      );
    }
    
    this.componentDidMount();
  };

  render() {
      const frame = IFRAME_URL_CC+this.state.sessionIdStore;
    return (
      <div>
        <h1 className="mt-3">Payment Information</h1>
        <h5 className="mt-4">Make payment using your Bank Details</h5>
        {this.state.isLoading && (<div className='itemCenter'>
          <iframe
            src={frame}
            id="iframe"
            width="80%"
            height="500px"
            title="aflac utla"
            sandbox="allow-scripts allow-forms allow-same-origin"
            Margin-left="20%"
            style={{boxShadow: '0 0 5px var(--shadow)',paddingTop:'5px;'}}
          />
        </div>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.product.products,
    totalRecurringAmount: state.product.totalRecurringAmount,
    totalDueAmount: state.product.totalDueAmount,
    paymentFrequency: state.product.paymentFrequency,
    recurringFrequency: state.product.recurringFrequency,
    dueDate: state.product.dueDate,
    customerId: state.landing.customerId,
    iframeResponse: state.product.iframeResponse,
    token: state.landing.customerId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    progressBarActions: bindActionCreators(progressbarActionCreators, dispatch),
    productActions: bindActionCreators(productsActionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IframeACHPage);
