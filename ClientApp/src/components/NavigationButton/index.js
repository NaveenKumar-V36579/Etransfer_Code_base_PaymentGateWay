import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const NavigationButton = props => {
  let buttonStyle = 'button buttonOrange';
  if (props.big) {
    buttonStyle = 'button buttonOrange buttonBig';
  }
  if (props.disabled) {
    buttonStyle = buttonStyle + ' disabledButton';
  }
  return (
    <div
      id='nav_button'
      onClick={() => {
        if (props.callBackFunc) props.callBackFunc();
        if (props.to) {
          props.history.push(props.to);
        }
      }}
      className={buttonStyle}
      disabled={props.disabled}
      aria-label={props.children}
      tabIndex={0}
    >
      {props.children}
    </div>
  );
};

NavigationButton.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  to: PropTypes.string,
  callBackFunc: PropTypes.func
};

export default withRouter(NavigationButton);
