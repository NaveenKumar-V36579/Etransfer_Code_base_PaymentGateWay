import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as progressbarActionCreators } from '../../store/progressbarReducer';
import { actionCreators as headerActionCreators } from '../../store/headerReducer';

class ThankYouPage extends Component {
  componentDidMount() {
    this.props.progressBarActions.doNotDisplay();
    this.props.headerActions.hideCart();
  }

  render() {
    return (
      <div className='thankYouPage'>
        <h1 className='tagline'>Thank You for Your Submission!</h1>
        <h3>
          Please allow 7-10 business days for processing and we will notify you with all the detailed payment and coverage information.
        </h3>
        <h4 className='mt-3'>
          We value the trust you have placed in us. If you need our help or if
          you have any questions, please visit aflac.com or call us toll free at
          1-800-99-AFLAC (1-800-992-3522). Our customer service representatives
          are here to assist you Monday through Friday from 8 a.m. to 8 p.m.
          Eastern time.
        </h4>
        <h4 className='mt-5'>Sincerely,</h4>
        <h4>Service &amp; Billing Assurance Organization</h4>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    progressBarActions: bindActionCreators(progressbarActionCreators, dispatch),
    headerActions: bindActionCreators(headerActionCreators, dispatch)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ThankYouPage);
