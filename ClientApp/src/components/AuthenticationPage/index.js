import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { notify } from "react-notify-toast";
import { actionCreators as progressbarActionCreators } from "../../store/progressbarReducer";
import { actionCreators as headerActionCreators } from "../../store/headerReducer";
import { actionCreators as productActionCreators } from "../../store/productReducer";
import ActionBar from "../ActionBar";
import {
  actionCreators as billingActionCreators,
  termsAndConditions,
  termsAndConditions2,
} from "../../store/billingReducer";

class AuthenticationPage extends Component {
     termsAndConditions =
    'I authorize Aflac to initiate recurring debit entries or charges electronically to the account indicated above for the premiums due on my policy(-ies). I authorize the institution to debit or charge same to the account. I agree this authorization shall remain effective and in full force until Aflac and the institution receive written notification from me of its termination in such time and in such manner to afford Aflac and the institution a reasonable opportunity to act on it. I authorize Aflac to continue to initiate recurring debit entries or charges to the account beyond the expiration date of the debit or credit card and to automatically update the card information as necessary to continue initiating debit entries or charges.';

     termsAndConditions2 = 'I acknowledge and agree I provided the account information or presented the credit or debit card referenced above. I represent I own the account or have legal authority to use the account or card referenced above. I agree to indemnify Aflac, hold Aflac harmless, and defend Aflac against any and all Losses arising out of or related to allegations I did not own the account or did not have legal authority to use the account or card referenced above. Losses include damages, liabilities, deficiencies, claims, actions, judgments, settlements, interest, awards, penalties, fines, costs, and/or expenses of whatever kind, including reasonable attorneys’ fees, that are incurred by Aflac.';

  state = {
    title: "Legal / Authorization Agreement",
    text: "Please read carefully and check the box to agree before submitting.",
    data: [
      {
        keyPoint:
          " I understand by checking this box I am giving my electronic signature and I authorize the following:",
        subData: [
          "Payment will be taken on date requested by me the policyholder;",
          "If there are not enough funds in my account or my credit card is rejected, Aflac may try again but is not required to;",
          "If my card continues to be rejected or my account continues to not have enough funds, my coverage may end subject to the terms of policy;",
        ],
      },
      {
        keyPoint:
          termsAndConditions,
        subData: [],
      },
      {
        keyPoint:
         termsAndConditions2,
        subData: [],
      },
      {
        keyPoint:
          "In accordance with the National association of Clearinghouse Operating Rules or my credit card company rules, I authorize American Family Life Assurance Company of Columbus (collectively, “Aflac”) to electronically debit my account at the financial institution indicated for the amount of my premium. I further authorize Aflac to debit or credit my account, when necessary, for any erros made.",
        subData: [],
      },
    ],
    isChecked: false,
    signature: "",
  };

  componentDidMount() {

    if (this.props.products.policies.length < 1) {
      this.props.history.push('/loggedOut');
    }
    this.props.progressBarActions.setCurrentStep(4);
    //this.props.headerActions.hideCart();
  }

  onClick = () => {
    this.setState({ isChecked: !this.state.isChecked });
  };

  onSign = (value) => {
    this.setState({ signature: value });
  };

  onClickSubmit = () => {
    const {signature} = this.state;
    if (signature==="" || signature===null ){
      notify.show(
        `Signature can't be empty. Please fill the value for Signature.`,
        "error",
        8000
      );
    }else{
      this.props.history.push("/reviewSubmit");
    }
        
  }


  render() {
    const {
      totalRecurringAmount,
      totalDueAmount,
      recurringFrequency,
      iframeACHResponse,
      paymentMode,
      iframeResponse
    } = this.props;
    const { title, text, data, isChecked,isLoading,signature } = this.state;
    return (
      <div className="authContainer">
        <div className="authTitle">{title}</div>
        <div className="authText">{text}</div>
        {data.map((item) => {
          return (
            <ul style={{ marginLeft: "-24px" }}>
              <li className="authKepyPoint">{item.keyPoint}</li>
              {item.subData.map((subKeyPoint) => {
                return (
                  <ul>
                    <li className="authKepyPoint">{subKeyPoint}</li>
                  </ul>
                );
              })}
            </ul>
          );
        })}
        <label
          style={{
            color: "#00a7e1",
            marginLeft: 15,
            fontFamily: "ProximaNovaBold",
          }}
        >
          E-SIGNATURE
        </label>
        <div className="checkBoxParent">
          <input
            className="authCheckBox"
            type={"checkbox"}
            onClick={this.onClick}
          ></input>
          <div className="labelCheckBox">
            Adding your signature confirms that the above information is
            accurate.
          </div>
        </div>
        {isChecked ? (
          <div>
            <label
              style={{
                color: "#00a7e1",
                marginLeft: 15,
                fontFamily: "ProximaNovaBold",
              }}
            >
              SIGNATURE
              <label style={{ color: "red" }}>*</label>
            </label>
            <div className="authInputParent">
              <input
                className="authInput"
                type={"text"}
                value={signature}
                onChange={(value) => this.onSign(value.text)}
              ></input>
            </div>
          </div>
        ) : null}
       
        <div className="buttonContainer">
        <ActionBar
          amount={totalRecurringAmount}
          dueAmount={totalDueAmount}
          path={""}
          buttonText="Review"
          frequency={recurringFrequency}
          disabled={!this.state.isChecked}
          callback={() => this.onClickSubmit()}
          isLoading={isLoading}
        />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.product.products,
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
    iframeACHResponse: state.product.iframeACHResponse,
    paymentMode: state.product.paymentMode,
    iframeResponse: state.product.iframeResponse,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
   
    headerActions: bindActionCreators(headerActionCreators, dispatch),
    progressBarActions: bindActionCreators(progressbarActionCreators, dispatch),
    billingActions: bindActionCreators(billingActionCreators, dispatch),
    productActions: bindActionCreators(productActionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationPage);
