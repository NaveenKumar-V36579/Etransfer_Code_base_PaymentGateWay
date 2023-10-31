import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { notify } from "react-notify-toast";
import { actionCreators as progressbarActionCreators } from "../../store/progressbarReducer";
import { actionCreators as productActionCreators } from "../../store/productReducer";
import {
  actionCreators as billingActionCreators,
  termsAndConditions,
  termsAndConditions2,
} from "../../store/billingReducer";
import { validateCard, updatePaymentType } from "../../api/APICalls";
import ActionBar from "../ActionBar";
import FormInputSelect from "../FormInputSelect";
import AddressForm from "../AddressForm";
import CardForm from "../CardForm";
import BankAccountForm from "../BankAccountForm";
import InputCheckbox from "../InputCheckbox";
import DraftDate from "../DraftDate";
import "../../assets/css/style.css";

class AddressBillingInfoPage extends Component {
  state = {
    agreedTNC: false,
    isLoading: false,
  };

  componentDidMount() {
    // if (this.props.totalRecurringAmount <= 0) {
    // this.props.history.push("/productSelection");
    //}
    this.props.progressBarActions.setCurrentStep(3);
    this.props.billingActions.getBillingYears();
  }

  onAcceptTNC = (agreementState) => {
    this.setState({
      agreedTNC: agreementState,
    });
  };

  successCallback = (payload) => {
    //API Call to update PaymentType in AuditTrail Log
    updatePaymentType(
      this.props.paymentInformation.paymentMethod.value,
      this.props.token
    );
    this.props.billingActions.setPaymentToken({ token: payload.data });
    this.props.history.push("/reviewSubmit");
    this.setState({ isLoading: false });
    notify.show(`Payment method added successfully`, "success", 2000);
  };

  failureCallback = (payload) => {
    this.setState({ isLoading: false });
    notify.show(
      `Your card details not verified successfully. Please ensure your card details is valid.Technical Error:: ${payload}`,
      "error",
      30000
    );
  };

  // onClickSubmit = () => {
  //   const { token } = this.props.token;
  //   const { paymentMethod } = this.props.paymentInformation;
  //   const {
  //     cardType,
  //     cardName,
  //     cardNumber,
  //     cvv,
  //     month,
  //     year,
  //     draftDate,
  //   } = this.props.paymentInformation.card;
  //   const {
  //     accountNumber,
  //     accountType,
  //     bankHolderName,
  //     bankName,
  //     bankDraftDate,
  //     routingNumber,
  //   } = this.props.paymentInformation.bank;
  //   const {
  //     bankCity,
  //     bankState,
  //     bankZipCode,
  //   } = this.props.paymentInformation.bank.address;
  //   const {
  //     addressLine1,
  //     addressLine2,
  //     city,
  //     state,
  //     zipCode,
  //   } = this.props.billingInformation.address;

  //   if (!paymentMethod) {
  //     notify.show("Please fill your payment method.", "error", 5000);
  //   } else if (
  //     this.props.paymentInformation.paymentMethod.value === "1" ||
  //     this.props.paymentInformation.paymentMethod.value === "2"
  //   ) {
  //     if (
  //       !cardType ||
  //       !cardName ||
  //       !cardNumber ||
  //       !cvv ||
  //       !month ||
  //       !year ||
  //       !draftDate
  //     ) {
  //       notify.show("Please fill all required card details.", "error", 5000);
  //     } else if (!addressLine1 || !city || !state || !zipCode) {
  //       notify.show("Please fill all required billing details.", "error", 5000);
  //     } else {
  //       const paymetricRequestData = {
  //         PaymentMethodID: this.props.paymentInformation.card.cardType.value,
  //         CreditCardTypeID: this.props.paymentInformation.card.cardType.value,
  //         CardNumber: this.props.paymentInformation.card.cardNumber
  //           .split(" ")
  //           .join(""),
  //         CreditCardDesc: this.props.paymentInformation.card.cardNumber
  //           .split(" ")
  //           .join(""),
  //         ExpMonth: this.props.paymentInformation.card.month.value,
  //         ExpYear: this.props.paymentInformation.card.year.value,
  //         CreditCardCVV: this.props.paymentInformation.card.cvv,
  //         BillName: this.props.paymentInformation.card.cardName,
  //         BillAddress1: this.props.billingInformation.address.addressLine1,
  //         BillAddress2: this.props.billingInformation.address.addressLine2,
  //         BillCity: this.props.billingInformation.address.city,
  //         BillStateAbbr: this.props.billingInformation.address.state.value,
  //         BillPostalCode: this.props.billingInformation.address.zipCode,
  //       };
  //       this.setState({ isLoading: true });
  //       validateCard(
  //         paymetricRequestData,
  //         this.successCallback,
  //         this.failureCallback
  //       );
  //     }
  //   } else if (
  //     this.props.paymentInformation.paymentMethod.value === "3" ||
  //     this.props.paymentInformation.paymentMethod.value === "4"
  //   ) {
  //     if (
  //       !accountNumber ||
  //       !accountType ||
  //       !bankHolderName ||
  //       !bankName ||
  //       !routingNumber ||
  //       !bankCity ||
  //       !bankState ||
  //       !bankZipCode ||
  //       !bankDraftDate
  //     ) {
  //       notify.show(
  //         "Please fill all required bank details accurately.",
  //         "error",
  //         5000
  //       );
  //     } else if (!addressLine1 || !city || !state || !zipCode) {
  //       notify.show("Please fill all required billing details.", "error", 5000);
  //     } else {
  //       //API Call to update PaymentType in AuditTrail Log
  //       updatePaymentType(
  //         this.props.paymentInformation.paymentMethod.value,
  //         this.props.token
  //       );
  //       this.props.history.push("/reviewSubmit");
  //       this.setState({ isLoading: false });
  //       notify.show(`Payment method added successfully`, "success", 2000);
  //     }
  //   } else {
  //     notify.show("Please fill all required information.", "error", 10000);
  //   }
  // };

  onClickSubmit = () => {
    const { token } = this.props;
    const { iframeResponse } = this.props;
    const { paymentMode } = this.props;
    const draftDate = sessionStorage.getItem('draftDate');
    const {
      addressLine1,
      city,
      state,
      zipCode,
    } = this.props.billingInformation.address;


      if (!addressLine1 || !city || !state || state.label === "" || !zipCode || !draftDate || draftDate==="null") {
        var errorMessage = !draftDate || draftDate==="null"?"Draft Date":!addressLine1 ? "address" : !city ? "city" : !state  || state.label === ""? "state" : "Zipcode";

        notify.show("Please fill required " + errorMessage + " in the billing details.", "error", 5000);
      } else {
        //API Call to update PaymentType in AuditTrail Log
        var accountType = paymentMode === "CREDIT_CARD" ? 1 : 2;
        updatePaymentType(
          accountType,
          token
        );
        notify.show(`Billing Address Information added successfully`, "success", 2000);
        this.setState({ isLoading: false });
        this.props.history.push("/authorize");
        
      }
  }

  handleDateChange(value) {
    sessionStorage.setItem("draftDate", value);
  }

  render() {
    const {
      totalRecurringAmount,
      totalDueAmount,
      billingStates,
      recurringFrequency,
      homeAddress,
      iframeResponse,
      paymentMode
    } = this.props;
    const { isLoading } = this.state;
    return (
      <div>
        <h2 className="mt-3">Payment Information</h2>

        <div
          style={{
            width: "320px",
            borderRadius: "10px",
            marginLeft: "40px",
            marginTop: "10px",
            background: "rgba(0, 167, 225, 0.5)",
            padding: "10px 20px",
            cursor: "pointer",
            boxShadow: "0px 0px 5px #888888",
            border: "2px solid traparent",
            margin: "auto",
            marginBottom: "30px"
          }}
        >
          <div style={{ fontSize: "24px", color: "black", marginLeft: "10px" }}>
            Card Information
          </div>
          <div style={{ display: "flex", justifyContainer: "flex-start" }}>
            <div
              style={{
                fontSize: "17px",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              Card Holder Name:{" "}
              <span style={{ fontSize: "17px", fontWeight: "bold" }}>
                {iframeResponse.cardName}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContainer: "flex-start" }}>
            <div
              style={{
                fontSize: "17px",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              Card Number:{" "}
              <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                {"XXXX-XXXX-XXXX-" + iframeResponse.cardNumber}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContainer: "flex-start" }}>
            <div
              style={{
                fontSize: "18px",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              Card Type:{" "}
              <span style={{ fontSize: "17px", fontWeight: "800" }}>
                {iframeResponse.cardType}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContainer: "flex-start" }}>
            <div
              style={{
                fontSize: "18px",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              Card Expiration:{" "}
              <span style={{ fontSize: "17px", fontWeight: "800" }}>
                {iframeResponse.cardExpiry}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContainer: "flex-start" }}>
            <div
              style={{
                fontSize: "18px",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              Card Account Type:{" "}
              <span style={{ fontSize: "17px", fontWeight: "800" }}>
                {paymentMode === "CREDIT_CARD" ? 'Credit Card' : 'Debit Card'}
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "450px",
            marginTop: "40px",
            marginLeft: "40px",
            margin: "auto",
          }}
        >
          <DraftDate
            model={"billingForm.paymentInformation.bank"}
            handleChange={this.handleDateChange}
          />
        </div>

        <br />
        <h2 className="mt-3">Billing Information</h2>
        <div className="formCenter">
          <AddressForm
            stateList={billingStates}
            homeAddress={homeAddress}
            model={`billingForm.billingInformation.address`}
            ischecked={localStorage.getItem("ischecked")}
          />
        </div>
        <ActionBar
          amount={totalRecurringAmount}
          dueAmount={totalDueAmount}
          path={""}
          buttonText="Review"
          frequency={recurringFrequency}
          // disabled={!this.state.agreedTNC}
          callback={() => this.onClickSubmit()}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    billingForm: state.billingForm,
    paymentInformation: state.billingForm.paymentInformation,
    billingInformation: state.billingForm.billingInformation,
    billingName: state.landing.customerName,
    billingMethods: state.billing.billingMethods,
    creditCardTypes: state.billing.cardTypes,
    billingMonths: state.billing.billingMonths,
    billingYears: state.billing.billingYears,
    paymentMethod: state.billingForm.paymentInformation.paymentMethod,
    billingStates: state.billing.billingStates,
    accountTypes: state.billing.accountTypes,
    totalRecurringAmount: state.product.totalRecurringAmount,
    totalDueAmount: state.product.totalDueAmount,
    recurringFrequency: state.product.recurringFrequency,
    homeAddress: state.billing.homeAddress,
    token: state.landing.customerId,
    iframeResponse: state.product.iframeResponse,
    paymentMode: state.product.paymentMode,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    progressBarActions: bindActionCreators(progressbarActionCreators, dispatch),
    billingActions: bindActionCreators(billingActionCreators, dispatch),
    productActions: bindActionCreators(productActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressBillingInfoPage);
