import React from 'react';
import { BarLoader } from 'react-spinners';

const Spinner = props => {
  const color = props.color ? props.color : '#00a7e1';

  return (
    <div className='spinnerContainer'>
      <BarLoader color={color} />
    </div>
  );
};

export default Spinner;
