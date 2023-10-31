import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as progressbarActionCreators } from '../../store/progressbarReducer';
import { actionCreators as headerActionCreators } from '../../store/headerReducer';

class NotFound extends Component {
  componentDidMount() {
    this.props.progressBarActions.doNotDisplay();
    this.props.headerActions.hideCart();
  }

  render() {
    return (
      <div>
        <h1 className='center heroPrimary pt-5'>
          You might be here by a mistake.
        </h1>
        <h3 className='mt-3 mb-4'>There is nothing here.</h3>
        <p className='ml-2'>Error Code: 404. Not Found.</p>
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
)(NotFound);
