import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as progressbarActionCreators } from '../../store/progressbarReducer';
import { actionCreators as headerActionCreators } from '../../store/headerReducer';

class MaintaincePage extends Component {
  componentDidMount() {
    this.props.progressBarActions.doNotDisplay();
    this.props.headerActions.hideCart();
  }

  render() {
    return (
        <div>
        <h3 className='center heroPrimary pt-5'>
         Thank you for being an Aflac policyholder.  
        Our system is currently under maintenance; however, you may continue your coverage by visiting MyAflac.com and signing into your account.  
        We are sorry for any inconvenience this may have caused.
        </h3>
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
)(MaintaincePage);
