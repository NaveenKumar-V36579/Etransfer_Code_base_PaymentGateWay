import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as progressbarActionCreators } from '../../store/progressbarReducer';
import { actionCreators as headerActionCreators } from '../../store/headerReducer';
import { actionCreators as landingActionCreators } from '../../store/landingReducer';
import { notify } from "react-notify-toast";

class AuthErrorPage extends Component {
  componentDidMount() {
    this.props.progressBarActions.doNotDisplay();
    this.props.headerActions.hideCart();
    this.props.landingActions.getAuthErrorMessage();
    this.showError();
  }

  showError(){
    {notify.show(`You might be here by a mistake : Please call us at 1-800-992-3522 between 8:00 AM to 8:00 PM EST, Monday to Friday.`,"error",30000)}
  }

  render() {
    const {
      authErrorMessage}=this.props;
    return (
      <div>
        <h1 className='heroSecondry pt-5'>
          {/* We didn't recognize the information you entered. */}
          {authErrorMessage == '' ?"You might be here by a mistake": authErrorMessage}
        
        </h1>
        <h4 className='mt-3 mb-4'>
          Please call us at 1-800-992-3522 between 8:00 AM to 8:00 PM EST,
          Monday to Friday.
        </h4>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authErrorMessage:state.landing.authErrorMessage
  };
};
const mapDispatchToProps = dispatch => {
  return {
    progressBarActions: bindActionCreators(progressbarActionCreators, dispatch),
    headerActions: bindActionCreators(headerActionCreators, dispatch),
    landingActions: bindActionCreators(landingActionCreators, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthErrorPage);
