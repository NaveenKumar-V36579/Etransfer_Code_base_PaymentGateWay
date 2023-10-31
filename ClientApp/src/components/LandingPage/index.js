import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import NavigationButton from '../NavigationButton';
import { Form, Control } from 'react-redux-form';
import DatePicker from 'react-datepicker';
import FormInputText from '../FormInputText';
import moment from 'moment';
import { actionCreators as progressbarActionCreators } from '../../store/progressbarReducer';
import { actionCreators as productsActionCreators } from '../../store/productReducer';
import { actionCreators as headerActionCreators } from '../../store/headerReducer';
import { actionCreators as landingActionCreators } from '../../store/landingReducer';
import { actionCreators as billingActionCreators } from '../../store/billingReducer';
import { getProducts,updateInitialChecks } from '../../api/APICalls';
import Spinner from '../Spinner';

class LandingPage extends Component {
  state = {
    navigationStyle: 'landingButton pt-3',
    dateOfBirth: null,
    zipCode: null,
    counter: 0,
    isLoading: true,
    apiZipCode: null,
    apiDateOfBirth: null
  };
  componentDidMount() {
    this.props.landingActions.setCustomerId({
      customerId: this.props.match.params.customerId
    });
    this.props.progressBarActions.doNotDisplay();
    this.props.headerActions.hideCart();
    if (!this.props.match.params.customerId) {
      this.setState({ navigationStyle: 'landingButton pt-3 invisible' });
    }
  }

  componentDidUpdate() {
    if (
      this.props.customerId &&
      this.state.apiZipCode===null&&
      this.state.apiDateOfBirth===null
    ) {
      this.getProductsRequest();
    }
  }

  getProductsRequest = () => {
    getProducts(
      this.props.customerId,
      this.getProductsSuccess,
      this.getProductsFailure
    );
  };

  getProductsSuccess = payload => {
    if (payload.data.httpStatus) {
      if (payload.data.httpStatus === 500) {
        notify.show(
          'There was an error while loading this page. Please refresh the page to continue. (500)',
          'error',
          -1
        );
      }
    } else if (payload.data.response === ' no record found ') {
       this.props.landingActions.setAuthErrorMessage({
         authErrorMessage: "The page you are attempting to access has expired."
       });
       this.props.history.push('/authError');

      //notify.show(
      //  'There was an error while loading this page. Please refresh the page to continue. (NoRecordFound)',
      //  'error',
      //  -1
      //);
      
    }
    else if (
        payload.data.policyHolderInfo.dateOfBirth &&
        payload.data.policyHolderInfo.address.zipCode
      ) {
        //Task - 590 : Display of Error Page if insured lands on the landing page after Surrender Date.
        var surrenderDate = moment(payload.data.policyHolderInfo.surrenderDate);
        var currentDate =  moment();//moment(payload.data.policyHolderInfo.surrenderDate).add(31,'days');
        this.setState({
          apiZipCode: payload.data.policyHolderInfo.address.zipCode,
          apiDateOfBirth: payload.data.policyHolderInfo.dateOfBirth,
          isLoading: false
        });
        
        if(currentDate>surrenderDate){ 
          if(currentDate.diff(surrenderDate,'days')>30)
          {
            this.props.landingActions.setAuthErrorMessage({
              authErrorMessage: "The page you are attempting to access has expired."
            });
            this.props.history.push('/authError');
          }
        }
        this.props.billingActions.setHomeAddress(
          payload.data.policyHolderInfo.address
        );
        this.props.landingActions.setCustomerName({
          name: payload.data.policyHolderInfo.name
        });
        this.props.productActions.setProducts(payload);
        this.props.productActions.setDueDate(
          payload.data.policyHolderInfo.surrenderDate
        );
        
      } 
  };

  getProductsFailure = payload => {
    notify.show(
      `There was an error while loading this page. Please refresh the page to continue. Technical Data:: ${payload}`,
      'error',
      -1
    );
  };

  handleDateChange = date => {
    this.setState({
      dateOfBirth: date
    });
  };

  handleValidation = () => {
    localStorage.setItem("ischecked",false);
    let validationState = false;
    let selectedDate = moment(this.state.dateOfBirth).format('DD/MM/YYYY');
    let apiDate = moment(this.state.apiDateOfBirth).format('DD/MM/YYYY');

    if (
      selectedDate !== apiDate ||
      this.state.zipCode !== this.state.apiZipCode
    ) {
      notify.show('Please provide valid inputs', 'error', 1000);
    } else if (
      selectedDate === apiDate &&
      this.state.zipCode === this.state.apiZipCode
    ) {
      validationState = true;
    }
   
    if (!validationState) {
      this.setState(
        {
          counter: this.state.counter + 1
        },
        () => {
          if (this.state.counter >= 3) {
            this.props.landingActions.setAuthErrorMessage({
              authErrorMessage: "We didn't recognize the information you entered."
            });
            this.props.history.push('/authError');
          }
        }
      );
    } else {
       const payload = {
        products: this.props.products.policies,
        customerId:this.props.customerId
       }
      updateInitialChecks(payload);
      this.props.history.push('/productSelection');
    }
  };

  handleOnChangeRaw = e => {
    e.preventDefault();
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div className='landingPageContainer'>
        <div className='hero'>
          <div className='heroImage' />
          <div className='heroImageOverlay'>
            <h1 className='heroText'>Keeping your Aflac coverage is easy.</h1>
            <h3 className='heroSubText mt-3'>
              To continue your Aflac coverage, just follow these easy steps to
              setup direct payment and never miss coverage.
            </h3>
          </div>
        </div>
        <div className='mt-3 mb-5 '>
          <h2 className='tagline'>
            It's easy to keep your Aflac coverage.<br/>
            Simply setup a direct payment plan.
          </h2>
         <p className='description'></p>
         <p className='description'></p>
         <p className='description'></p>
          <p className='description'>
            Since your coverage is portable, meaning it belongs to you
            individually – and not your employer – you can pay your premiums
            directly to Aflac to ensure continued coverage.
          </p>
          <p className='description'>
           Our insurance provides an extra layer of protection for the things you may not have planned – with immediate cash
           benefits paid directly to you to use for things like rent, groceries and out-of-pocket medical costs that aren't 
           covered by your major medical plan.
          </p>
          <p className='description'>
              Click on the button below and follow the simple steps to stay covered.
          </p>
          <p className='description'>
              Your privacy is very important to us, Please enter your zipcode and date of birth below for identification.
          </p>

          <div className='landingNavContainer'>
            {isLoading ? (
              <div className={this.state.navigationStyle}>
                <Spinner />
              </div>
            ) : (
              <div className={this.state.navigationStyle}>
                <Form className='formStyle' autoComplete='off' model='auth'>
                  <FormInputText
                    label='Zip Code'
                    required
                    type='number'
                    placeholder={`Enter your zip code`}
                    maxLength={5}
                    model='auth.zipCode'
                    onChange={value => this.setState({ zipCode: value })}
                  />
                  <div>
                    <label className='inputLabel'>
                      Date of Birth
                      <span className='requiredText'>*</span>
                    </label>
                    <div className='inputDatePickerRow'>
                      <Control
                        component={DatePicker}
                        onChangeRaw={this.handleOnChangeRaw}
                        className='form-control'
                        onChange={this.handleDateChange}
                        selected={this.state.dateOfBirth}
                        maxDate={new Date()}
                        placeholderText='Select your date of birth'
                        showMonthDropdown
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={80}
                        model='auth.dateOfBirth'
                        dateFormat='MM/dd/yyyy'
                      />
                    </div>
                  </div>
                </Form>
                <NavigationButton
                  to={''}
                  disabled={this.props.match.params.customerId ? false : true}
                  big
                  callBackFunc={this.handleValidation}
                >
                  Continue My Coverage
                </NavigationButton>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    customerId: state.landing.customerId,
    products: state.product.products,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    progressBarActions: bindActionCreators(progressbarActionCreators, dispatch),
    productActions: bindActionCreators(productsActionCreators, dispatch),
    headerActions: bindActionCreators(headerActionCreators, dispatch),
    landingActions: bindActionCreators(landingActionCreators, dispatch),
    billingActions: bindActionCreators(billingActionCreators, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
