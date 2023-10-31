import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { actionCreators as progressbarActionCreators } from '../../store/progressbarReducer';
import { actionCreators as billingActionCreators } from '../../store/billingReducer';
import { actionCreators as productActionCreators } from '../../store/productReducer';
import { saveInsureCoverage } from '../../api/APICalls';
import ProductListItem from '../ProductListItem';
import ActionBar from '../ActionBar';
import ProductCard from '../ProductCard';

class ReviewAndSubmitPage extends Component {
  state = {
    isLoading: false
  };

  componentDidMount() {
    if (this.props.totalRecurringAmount <= 0) {
      this.props.history.push('/productSelection');
    }
    this.props.progressBarActions.setCurrentStep(5);
  }

  submitSuccess = payload => {
    this.setState({
      isLoading: false
    });
    this.props.productActions.clearCart();
    this.props.history.push('/thankYou');
  };

  submitFailure = payload => {
    this.setState({
      isLoading: false
    });
    notify.show(
      `There was an error submitting your form. Please try again. Technical Data:: ${payload}`,
      'error',
      3000
    );
  };

  onClickSubmit = () => {
    const {
      token,
      customerName,
      cartItems,
      totalDueAmount,
      recurringFrequency,
      address,
      iframeResponse,
      paymentMode,
      iframeACHResponse
    } = this.props;
    
    const requestData = {
      token: token,
      name: customerName,
      paymentTokenId: paymentMode==="BANK_ACCOUNT_MODE" ? iframeACHResponse.repToken:iframeResponse.repToken,
      policies: cartItems,
      customerpaymentinfoviewModel: {
        paymentType: paymentMode==="BANK_ACCOUNT_MODE" ? 'B' : 'C',
        billingInfo: {
          termCondition: new Date().toString(),
          totalAmount: parseFloat(totalDueAmount),
          frequency: recurringFrequency === 'Monthly' ? 'M' : 'Q',
          draftDate: moment(sessionStorage.getItem("draftDate")).format('MM/DD/YYYY'),
          address: {
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            city: address.city,
            state: address.state.value,
            zipCode: address.zipCode
          }
        },
        payment: {
          creditCard: {
            creditCardType: iframeResponse.cardType,
            creditCardExpirationDate: iframeResponse.cardExpiry,
            creditCardNumber: iframeResponse.cardNumber,
          },
          bank: paymentMode==="BANK_ACCOUNT_MODE"? {
            bankName: iframeResponse.bankName,
            address: {
              city: null,
              state: null,
              zipCode: null
            },
            accountType: paymentMode==="BANK_ACCOUNT_MODE"?iframeACHResponse.paymentType:"",
            routingNumber: iframeACHResponse.routingNumber,
            accountNumber: iframeACHResponse.accountNumber
          }:{
            bankName: null,
            address: {
              city: null,
              state: null,
              zipCode: null,
            },
            accountType:null,
            routingNumber: null,
            accountNumber: null
          }
        }
      },
      IframeZipCode: iframeResponse.postalCode
    };
    this.setState({ isLoading: true });
    saveInsureCoverage(requestData, this.submitSuccess, this.submitFailure);
  };

  render() {
    const {
      totalRecurringAmount,
      totalDueAmount,
      cartItems,
      recurringFrequency,
      bankDraftDate,
      iframeResponse,
      paymentMode,
      iframeACHResponse
    } = this.props;
    const { isLoading } = this.state;
   
    const maskedCardNumber =  iframeResponse.cardNumber  ? '************' + iframeResponse.cardNumber:'';
    const maskedRoutingNumber = iframeACHResponse.routingNumber ? '*****' + iframeACHResponse.routingNumber.substring(5): '';
    let maskedAccountNumber = '*****' + iframeACHResponse.accountNumber;

    return (
      <div>
        <br />
        <h3 className='reviewPageHeadingContainer mt-3'>
          In Your Cart
          <span>
            <Link className='link2' to='/productSelection'>
              Change Items
            </Link>
          </span>
        </h3>
        {cartItems.length > 0 ? (
          <div className='productContainer'>
            {cartItems.map((product, index) => (
              <ProductCard
                key={`product${index}`}
                product={product}
                onChange={this.handleChange}
                paymentFrequency={recurringFrequency}
                canBeChecked={false}
              />
            ))}
          </div>
        ) : (
          <h4 className='genericText itemCenter'>No Items In Your Cart!</h4>
        )}
        <br />
        <h2>Billing Information</h2>
        <div className='itemCenter'>
          {paymentMode==="BANK_ACCOUNT_MODE" ? (
            <ProductListItem
              subItemStyle='paymentSubItem'
              product={[
                ['Bank Name', iframeACHResponse.bankName],
                ['Routing Number', maskedRoutingNumber],
                ['Account Number', maskedAccountNumber],
                ['Draft Date', moment(bankDraftDate).format('MM/DD/YYYY')],
                [
                  'Actions',
                  <div>
                    <Link className='link2' to= '/cardSelection'>
                      Change Payment Method
                    </Link>
                  </div>
                ]
              ]}
            />
          ) : (
            <ProductListItem
              subItemStyle='paymentSubItem'
              product={[
                ['Card Type', iframeResponse.cardType],
                ['Card Number', maskedCardNumber],
                [
                  'Expiration Date',
                  `${iframeResponse.cardExpiry}`
                ],
                ['Draft Date', moment(sessionStorage.getItem("draftDate")).format('MM/DD/YYYY')],
                [
                  'Actions',
                  <div>
                    <Link className='link2' to='/cardSelection'>
                      Change Payment Method
                    </Link>
                  </div>
                ]
              ]}
            />
          )}
        </div>
        <ActionBar
          amount= {totalRecurringAmount}
          dueAmount={totalDueAmount}
          path={''}
          buttonText='Submit'
          callback={this.onClickSubmit}
          frequency={recurringFrequency}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.landing.customerId,
    customerName: state.landing.customerName,
    paymentToken: state.billing.paymentToken,
    cartItems: state.product.cartItems,
    paymentType: state.billingForm.paymentInformation.paymentMethod.value,
    totalRecurringAmount: state.product.totalRecurringAmount,
    totalDueAmount: state.product.totalDueAmount,
    recurringFrequency: state.product.recurringFrequency,
    bankDraftDate: state.billingForm.paymentInformation.bank.bankDraftDate,
    cardDraftDate: state.billingForm.paymentInformation.card.draftDate,
    address: state.billingForm.billingInformation.address,
    cardType: state.billingForm.paymentInformation.card.cardType
      ? state.billingForm.paymentInformation.card.cardType.value === 'VISA'
        ? 'V'
        : 'M'
      : '',
    cardTypeString: state.billingForm.paymentInformation.card.cardType
      ? state.billingForm.paymentInformation.card.cardType.value
      : '',
    cardExpirationDate: state.billingForm.paymentInformation.card.month
      ? `01/${state.billingForm.paymentInformation.card.month.value}/${state.billingForm.paymentInformation.card.year.value}`
      : '',
    cardExpirationMonth: state.billingForm.paymentInformation.card.month
      ? state.billingForm.paymentInformation.card.month.value
      : '',
    cardExpirationYear: state.billingForm.paymentInformation.card.year
      ? state.billingForm.paymentInformation.card.year.value
      : '',
    bankName: state.billingForm.paymentInformation.bank.bankName,
    bankCity: state.billingForm.paymentInformation.bank.address.bankCity,
    bankState: state.billingForm.paymentInformation.bank.address.state
      ? state.billingForm.paymentInformation.bank.address.state.value
      : '',
    bankZipCode: state.billingForm.paymentInformation.bank.address.bankZipCode,
    routingNumber: state.billingForm.paymentInformation.bank.routingNumber,
    accountNumber: state.billingForm.paymentInformation.bank.accountNumber,
    cardNumber: state.billingForm.paymentInformation.card.cardNumber,
    iframeResponse: state.product.iframeResponse,
    paymentMode: state.product.paymentMode,
    draftDate: state.product.draftDate,
    iframeACHResponse: state.product.iframeACHResponse,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    progressBarActions: bindActionCreators(progressbarActionCreators, dispatch),
    billingActions: bindActionCreators(billingActionCreators, dispatch),
    productActions: bindActionCreators(productActionCreators, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewAndSubmitPage);
