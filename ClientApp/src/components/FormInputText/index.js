import React from 'react';
import { Control } from 'react-redux-form';
import InputText from '../InputText';

const FormInputText = ({model, ...props}) => (

  <Control component={InputText} model={model}  {...props} />
);

export default FormInputText;
