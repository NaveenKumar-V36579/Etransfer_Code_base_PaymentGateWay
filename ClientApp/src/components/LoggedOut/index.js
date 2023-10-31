import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as progressbarActionCreators } from '../../store/progressbarReducer';
import { actionCreators as headerActionCreators } from '../../store/headerReducer';

class LoggedOut extends Component {
  componentDidMount() {
    this.props.progressBarActions.doNotDisplay();
    this.props.headerActions.hideCart();
  }

  render() {
    return (
      <div>
        <h1 className='center heroPrimary pt-5'>You have been logged out!</h1>
        <h4 className='mt-3 mb-4'>
          For security reasons, we have disabled the refresh button. To avoid
          being logged out, please do not press the browser refresh button on
          any of the pages.
        </h4>
        <h4 className='mt-3 mb-4'>
          Please use the link sent to you by email to log in again.
        </h4>
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
)(LoggedOut);
