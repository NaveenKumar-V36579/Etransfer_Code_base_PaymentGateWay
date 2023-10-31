import React from 'react';
import { Control } from 'react-redux-form';
import InputSelect from '../InputSelect';

const FormInputSelect = ({ model, ...props }) => (
  <Control component={InputSelect} model={model} {...props} />
);

export default FormInputSelect;
