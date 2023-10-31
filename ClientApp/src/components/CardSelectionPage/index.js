import React, { Component } from "react";
import { connect } from "react-redux";
import { actionCreators as progressbarActionCreators } from "../../store/progressbarReducer";
import { actionCreators as productsActionCreators } from "../../store/productReducer";
import { actionCreators as billingActionCreators } from "../../store/billingReducer";
import { bindActionCreators } from "redux";
import { notify } from "react-notify-toast";
import styles from './style.css'

class CardSelectionPage extends Component {
  constructor() {
    super();
    // this.handleChange = this.handleChange.bind(this);
    this.state = {
      firtsRadio: false,
      secondRadio: false,
      thirdRadio: false,
    };
  }
  componentDidMount() {
    if (this.props.products.policies.length < 1) {
      this.props.history.push('/loggedOut');
    }
    this.props.progressBarActions.setCurrentStep(2);
    this.props.billingActions.clearBillingInfo();
  }

  handleChange(value) {
    if (value === "1") {
      this.setState({
        firtsRadio: true,
        secondRadio: false,
        thirdRadio: false,
      });
      this.props.productActions.setPaymentMode("BANK_ACCOUNT_MODE");
      sessionStorage.setItem("Mode_Payment","BANK");
    } else if (value === "2") {
      this.setState({
        firtsRadio: false,
        secondRadio: true,
        thirdRadio: false,
      });
      this.props.productActions.setPaymentMode("CREDIT_CARD");
      sessionStorage.setItem("Mode_Payment","CARD");
      this.props.billingActions.clearBillingInfo();

    } else if (value === "3") {
      this.setState({
        firtsRadio: false,
        secondRadio: false,
        thirdRadio: true,
      });
      this.props.productActions.setPaymentMode("DEBIT_CARD");
      sessionStorage.setItem("Mode_Payment","CARD");
    }
  }

  handleSubmit() {
    if (
      !this.state.firtsRadio &&
      !this.state.secondRadio &&
      !this.state.thirdRadio
    ) {
      notify.show(`Please select any one mode of payment.`, "error", 3000);
      return;
    }

    if (this.state.firtsRadio) {
      this.props.history.push("/IframeACHPage");
    } else {
      this.props.history.push("/Iframe");
    }
  }
  

  render() {
    
    return (
      <div style={{ marginTop: "30px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "spacebetween",
            flexDirection: "column",
          }}
        >
          <div>
            <input
              type="radio"
              value="1"
              checked={this.state.firtsRadio}
              style={{
                color: "#ff9800",
                background: "#ff9800",
                width: "100px",
              }}
              onChange={() => this.handleChange("1")}
              id="1"
            />
            <label style={{ color: "#00a7e1", marginLeft: "-25px",  }} for="Bank Account"  >
              Bank Acount
            </label>
          </div>
          <div style = {{marginTop : "10px"}}>
            <input
              type="radio"
              value="2"
              checked={this.state.secondRadio}
              id="2"
              className = {styles.input}
              style={{
                color: "#ff9800",
                background: "#ff9800",
                width: "100px",
              }}
              onChange={() => this.handleChange("2")}
            />
            <label style={{ color: "#00a7e1", marginLeft: "-25px" }} for="Bank Account">
              Credit Card
            </label>
          </div>
          <div style = {{marginTop : "10px"}}>
            <input
              type="radio"
              value="3"
              checked={this.state.thirdRadio}
              id="3"
              style={{
                color: "#ff9800",
                background: "#ff9800",
                width: "100px",
              }}
              onChange={() => this.handleChange("3")}
            />
            <label style={{ color: "#00a7e1", marginLeft: "-25px" }} for="Bank Account" >
              Debit Card
            </label>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            marginTop: "30px",
            marginLeft:"40px"
          }}
        >
          <button
            style={{
              background: "#ff9800",
              height: "55px",
              width: "200px",
              color: "white",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              border: "1px solid #ff9800",
            }}
            onClick={() => this.handleSubmit("button")}
          >
            Next
          </button>
        </div>
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
    paymentMode: state.product.paymentMode,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    progressBarActions: bindActionCreators(progressbarActionCreators, dispatch),
    productActions: bindActionCreators(productsActionCreators, dispatch),
    billingActions: bindActionCreators(billingActionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardSelectionPage);
