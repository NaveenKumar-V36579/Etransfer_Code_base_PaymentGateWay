import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as progressbarActionCreators } from '../../store/progressbarReducer';
import { actionCreators as productsActionCreators } from '../../store/productReducer';
import ProductCard from '../ProductCard';
import ActionBar from '../ActionBar';
import InputSelect from '../InputSelect';
import { UpdateSelectedPolicies } from '../../api/APICalls';

class ProductSelectionPage extends Component {

  
  componentDidMount() {
    if (this.props.products.policies.length < 1) {
      this.props.history.push('/loggedOut');
    }
   
    this.props.progressBarActions.setCurrentStep(1);
    this.props.productActions.calculateTotalAmount();
    this.props.productActions.calculateTotalDueAmount();
    this.props.productActions.changeRecurringFrequency(this.props.recurringFrequency);
  }

  handleChange = (productId, isChecked) => {
    this.props.productActions.changeSelected(productId, isChecked);
    this.props.productActions.calculateTotalAmount();
    this.props.productActions.calculateTotalDueAmount();
  };

  addToCart = () => {
    const policiesRequestData = {
      products: this.props.products.policies.filter(
        product => product.selected === true
      ),
      customerId: this.props.customerId,
    };

    UpdateSelectedPolicies(policiesRequestData);

    this.props.productActions.addToCart();
  };

  onPaymentFrequencyChange = selectedFrequencyObject => {
    this.props.productActions.changeRecurringFrequency(
      selectedFrequencyObject.value
    );
    this.props.productActions.calculateTotalAmount();
  };

  render() {
    const {
      totalRecurringAmount,
      totalDueAmount,
      products,
      paymentFrequency,
      recurringFrequency,
      dueDate
    } = this.props;
    return (
      <div>
        <h1 className='tagline text-center mt-3'>Select the plans that you would like to continue through direct
          payment.</h1>
        <p className='description mt-2 md-2'>
          {`To continue getting the coverage and protection you need – at your
          current rate – we need to hear from you by or before ${dueDate}. Please select your billing frequency and click on a relevant card to select it.`}
        </p>
        <div className='formCenter mt-5 mb-5'>
          <InputSelect
            label='Select Billing Frequency'
            required
            options={paymentFrequency}
            onChange={this.onPaymentFrequencyChange}
            placeholder='Select Billing Frequency'
            initialValue={{
              label: recurringFrequency,
              value: recurringFrequency
            }}
          />
        </div>
        <div className='productContainer'>
          {products.policies.map((product, index) => (
            <ProductCard
              key={`product${index}`}
              product={product}
              onChange={this.handleChange}
              paymentFrequency={recurringFrequency}
              canBeChecked={true}
              tabNumber={index}
            />
          ))}
        </div>
        <ActionBar
          amount={totalRecurringAmount}
          dueAmount={totalDueAmount}
          path='/cardSelection'
          buttonText='Next'
          callback={this.addToCart}
          frequency={this.props.recurringFrequency}
        />
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.products,
    totalRecurringAmount: state.product.totalRecurringAmount,
    totalDueAmount: state.product.totalDueAmount,
    paymentFrequency: state.product.paymentFrequency,
    recurringFrequency: state.product.recurringFrequency,
    dueDate: state.product.dueDate,
    customerId:state.landing.customerId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    progressBarActions: bindActionCreators(progressbarActionCreators, dispatch),
    productActions: bindActionCreators(productsActionCreators, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductSelectionPage);
