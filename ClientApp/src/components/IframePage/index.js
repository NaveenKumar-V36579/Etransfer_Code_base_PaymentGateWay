import React, { Component } from "react";
import { notify } from "react-notify-toast";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators as progressbarActionCreators } from "../../store/progressbarReducer";
import { actionCreators as productsActionCreators } from "../../store/productReducer";
import { getRepTokenResponse,API_BASE,IFRAME_URL_CC } from "../../api/APICalls";

class IframeLayout extends Component {
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
        API_BASE + "api/Iframe/FetchIFrameSessionID?token="+this.props.token
      )
      .then((response) => {
        this.setState({
          sessionIdStore: response.data.sessionId,
          isLoading: response.data.isSuccess,
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
      getRepTokenResponse(repToken,this.props.token, this.submitSuccess);
    }
  };

  submitSuccess = (payload) => {
    this.setState({
      isLoading: false,
    });
    this.props.productActions.setIframeResponse(payload.data);
    this.props.history.push("/addressBillingInfo");
  };

  submitFailure = (payload) => {
    this.setState({
      isLoading: false,
    });
    notify.show(
      `There was an error submitting your form. Please try again. Technical Data:: invalid card details`,
      "error",
      3000
    );
    this.componentDidMount();
  };

  render() {
  
   //DEV
      const frame = IFRAME_URL_CC+this.state.sessionIdStore;

    return (
      <div>
        <h2 className="mt-3">Payment Information</h2>
        <h5 className="mt-3">
          <span className="requiredText">*</span> Denotes a Required Field.
        </h5>
        {this.state.isLoading && (
          <iframe
            src={frame}
            id="iframe"
            width="100%"
            height="500px"
            title="aflac utla"
            sandbox="allow-scripts allow-forms allow-same-origin"
          />
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(IframeLayout);
