import React from 'react';
import NavigationButton from '../NavigationButton';
import Spinner from '../Spinner';

const ActionBar = ({
  amount,
  dueAmount,
  frequency,
  path,
  buttonText,
  callback,
  disabled,
  isLoading
}) => (
  <div>
    <div className='actionBar pt-3 pb-3 pr-3 pl-3 mt-5'>
      <div className='actionBarTextContainer'>
        <span className='actionBarText'>
          Total Due Today <span className='actionBarAmount'>${dueAmount}</span>
        </span>
        <span className='actionBarText'>
          {`Total Recurring ${frequency} Amount `}
          <span className='actionBarAmount'>${amount}</span>
        </span>
      </div>
    </div>
    <div className='actionBarNavButtonContainer'>
      <NavigationButton
        to={path}
        callBackFunc={callback}
        disabled={disabled || isLoading || !parseFloat(amount) > 0}
      >
        {isLoading ? <Spinner /> : buttonText}
      </NavigationButton>
    </div>
  </div>
);

export default ActionBar;
