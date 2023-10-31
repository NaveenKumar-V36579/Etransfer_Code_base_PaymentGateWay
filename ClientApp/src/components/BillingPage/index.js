import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { notify } from "react-notify-toast";
import { actionCreators as progressbarActionCreators } from "../../store/progressbarReducer";
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

class BillingPage extends Component {
  state = {
    agreedTNC: false,
    isLoading: false,
  };

  componentDidMount() {
    // if (this.props.totalRecurringAmount <= 0) {
    //   this.props.history.push("/productSelection");
    // }
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

  onClickSubmit = () => {
    const { token } = this.props.token;
    const { paymentMethod } = this.props.paymentInformation;
    const {
      cardType,
      cardName,
      cardNumber,
      cvv,
      month,
      year,
      draftDate,
    } = this.props.paymentInformation.card;
    const {
      accountNumber,
      accountType,
      bankHolderName,
      bankName,
      bankDraftDate,
      routingNumber,
    } = this.props.paymentInformation.bank;
    const {
      bankCity,
      bankState,
      bankZipCode,
    } = this.props.paymentInformation.bank.address;
    const {
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
    } = this.props.billingInformation.address;

    if (!paymentMethod) {
      notify.show("Please fill your payment method.", "error", 5000);
    } else if (
      this.props.paymentInformation.paymentMethod.value === "1" ||
      this.props.paymentInformation.paymentMethod.value === "2"
    ) {
      if (
        !cardType ||
        !cardName ||
        !cardNumber ||
        !cvv ||
        !month ||
        !year ||
        !draftDate
      ) {
        notify.show("Please fill all required card details.", "error", 5000);
      } else if (!addressLine1 || !city || !state || !zipCode) {
        notify.show("Please fill all required billing details.", "error", 5000);
      } else {
        const paymetricRequestData = {
          PaymentMethodID: this.props.paymentInformation.card.cardType.value,
          CreditCardTypeID: this.props.paymentInformation.card.cardType.value,
          CardNumber: this.props.paymentInformation.card.cardNumber
            .split(" ")
            .join(""),
          CreditCardDesc: this.props.paymentInformation.card.cardNumber
            .split(" ")
            .join(""),
          ExpMonth: this.props.paymentInformation.card.month.value,
          ExpYear: this.props.paymentInformation.card.year.value,
          CreditCardCVV: this.props.paymentInformation.card.cvv,
          BillName: this.props.paymentInformation.card.cardName,
          BillAddress1: this.props.billingInformation.address.addressLine1,
          BillAddress2: this.props.billingInformation.address.addressLine2,
          BillCity: this.props.billingInformation.address.city,
          BillStateAbbr: this.props.billingInformation.address.state.value,
          BillPostalCode: this.props.billingInformation.address.zipCode,
        };
        this.setState({ isLoading: true });
        validateCard(
          paymetricRequestData,
          this.successCallback,
          this.failureCallback
        );
      }
    } else if (
      this.props.paymentInformation.paymentMethod.value === "3" ||
      this.props.paymentInformation.paymentMethod.value === "4"
    ) {
      if (
        !accountNumber ||
        !accountType ||
        !bankHolderName ||
        !bankName ||
        !routingNumber ||
        !bankCity ||
        !bankState ||
        !bankZipCode ||
        !bankDraftDate
      ) {
        var errorMessage = !accountNumber ? "Account Number" : !accountType ? "Account type" : !bankHolderName ? "Bank Holder Name" : 
                           !bankName ? "Bank Name" : !routingNumber ? "Routing Number" :!bankCity?"City" :!bankState ? "state":!bankZipCode ? "Zipcode":
                            "draftdate";
        notify.show("Please fill required " + errorMessage + " details.", "error", 5000);
        } else if (!addressLine1 || !city || !state || !state.label===""|| !zipCode|| !bankDraftDate ) {
        var errorMessage = !addressLine1 ? "address" : !city ? "city" : !state || !state.label===""? "state" : !zipCode ? "Zipcode" : "draftDate";
        notify.show("Please fill required " + errorMessage + " in the billing details.", "error", 5000);
      }else if (!this.isValidRoutingNumber(routingNumber)) {
        notify.show("Invalid Routing Number. Please enter valid Routing number.", "error",5000);
      }
       else {
        //API Call to update PaymentType in AuditTrail Log
        updatePaymentType(
          this.props.paymentInformation.paymentMethod.value,
          this.props.token
        );
        this.props.history.push("/reviewSubmit");
        this.setState({ isLoading: false });
        notify.show(`Payment method added successfully`, "success", 2000);
      }
    } else {
      notify.show("Please fill all required information.", "error", 10000);
    }
  };

  isValidRoutingNumber(routing){
    if (routing.length !== 9) {
      return false;
  }
  // http://en.wikipedia.org/wiki/Routing_transit_number#MICR_Routing_number_format
  var checksumTotal = (7 * (parseInt(routing.charAt(0),10) + parseInt(routing.charAt(3),10) + parseInt(routing.charAt(6),10))) +
                      (3 * (parseInt(routing.charAt(1),10) + parseInt(routing.charAt(4),10) + parseInt(routing.charAt(7),10))) +
                      (9 * (parseInt(routing.charAt(2),10) + parseInt(routing.charAt(5),10) + parseInt(routing.charAt(8),10)));
  
  var checksumMod = checksumTotal % 10;
  if (checksumMod !== 0) {
      return false;
  } else {
      return true;
  }


  }

  render() {
    const {
      totalRecurringAmount,
      totalDueAmount,
      billingMethods,
      creditCardTypes,
      billingYears,
      billingMonths,
      paymentMethod,
      billingStates,
      accountTypes,
      recurringFrequency,
      homeAddress,
    } = this.props;
    const { isLoading } = this.state;
    return (
      <div>
        <h2 className="mt-3">Payment Information</h2>
        <h5 className="mt-3">
          <span className="requiredText">*</span> Denotes a Required Field.
        </h5>
        <div className="formCenter">
          <FormInputSelect
            label="Payment Method"
            required
            placeholder="Select a Payment Method"
            options={billingMethods}
            model="billingForm.paymentInformation.paymentMethod"
            validators={{
              required: (val) => val && val.length,
            }}
          />

          <BankAccountForm
            stateList={billingStates}
            typeOptions={accountTypes}
            model={"billingForm.paymentInformation.bank"}
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
        <br />
        <h2 className="mt-3">Terms &amp; Conditions</h2>
        <div className="formCenter">
          <div className="tncContainer">
            <p className="legal">{termsAndConditions}</p>
            <p className="legal">{termsAndConditions2}</p>
          </div>
          <br />
          <InputCheckbox
            label="I Accept the Terms &amp; Conditions"
            required
            customClass="link"
            onClick={(agreementState) => this.onAcceptTNC(agreementState)}
          />
        </div>
        <ActionBar
          amount={10}
          dueAmount={10}
          path={""}
          buttonText="Review"
          frequency={recurringFrequency}
          disabled={!this.state.agreedTNC}
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    progressBarActions: bindActionCreators(progressbarActionCreators, dispatch),
    billingActions: bindActionCreators(billingActionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillingPage);
