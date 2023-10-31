import React, { Component } from 'react';

class ProductCard extends Component {
  state = {
    selectionStateStyle: this.props.product.selected
      ? 'selectedProductCard'
      : 'productCard',
    selectionStateTitleStyle: this.props.product.selected
      ? 'selectedProductTitle'
      : 'productTitle',
    selectionStateAmountStyle: this.props.product.selected
      ? 'selectedAmount'
      : 'productAmount',
    selectionStateCheckboxStyle: this.props.product.selected
      ? 'selectedProductCheckbox'
      : 'productCheckbox'
  };

  componentDidMount() {
    let parent = document.getElementById(`parent${this.props.tabNumber}`);
    parent.addEventListener('keyup', event => {
      if (event.keyCode === 13 && document.activeElement === parent) {
        this.toggleSelectionStateStyle(this.props.product.id);
      }
    });
  }

  toggleSelectionStateStyle = id => {
    if (this.state.selectionStateStyle === 'productCard') {
      this.setState({
        selectionStateStyle: 'selectedProductCard',
        selectionStateTitleStyle: 'selectedProductTitle',
        selectionStateAmountStyle: 'selectedAmount',
        selectionStateCheckboxStyle: 'selectedProductCheckbox'
      });
      this.props.onChange(id, true);
    } else {
      this.setState({
        selectionStateStyle: 'productCard',
        selectionStateTitleStyle: 'productTitle',
        selectionStateAmountStyle: 'productAmount',
        selectionStateCheckboxStyle: 'productCheckbox'
      });
      this.props.onChange(id, false);
    }
  };
  render() {
    const { product, paymentFrequency, canBeChecked, tabNumber } = this.props;
    const {
      selectionStateStyle,
      selectionStateTitleStyle,
      selectionStateAmountStyle,
      selectionStateCheckboxStyle
    } = this.state;
    return (
      <div
        className={selectionStateStyle}
        onClick={() => {
          if (canBeChecked) this.toggleSelectionStateStyle(product.id);
        }}
        tabIndex={0}
        id={`parent${tabNumber}`}
      >
        <div className='productHeader'>
          <div className='productHeading'>
            {/* <div className='productImageContainer mr-3'>
              <img
                src={require(`../../assets/img/${product.icon}.png`)}
                className="productImage"
                alt={product.ProductName}
              />
            </div> */}
            <div className={`${selectionStateTitleStyle}`}>
              {product.productName}
            </div>
          </div>
          <div className='productCheckboxContainer mr-3'>
            <img
              src={require(`../../assets/img/checkmark.svg`)}
              className={`${selectionStateCheckboxStyle}`}
              alt={product.productName}
            />
          </div>
        </div>
        <div className='productDescription mt-2'>
          Coverage Type:
          <span className='productPolicyNumber'> {product.coverageType}</span>
        </div>
        <div className='productDescription mt-2 mb-2'>
          Policy Number:
          <span className='productPolicyNumber'> {product.policyNumber}</span>
        </div>
        <div className='productPaymentInfo'>
          <div className='productAmountRow'>
            Due Today
            <span className={`${selectionStateAmountStyle} ml-2`}>
              ${product.dueToday}
            </span>
          </div>
          <div className='productAmountRow'>
            {`${paymentFrequency} Payments of`}
            <span className={`${selectionStateAmountStyle} ml-2`}>
              {`$${
                paymentFrequency === 'Monthly'
                  ? product.recurringAmountMonthly
                  : product.recurringAmountQuarterly
              }`}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
