import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputText extends Component {
  state = {
    errorMessage: this.props.errorMessage ? this.props.errorMessage : '',
    errorStyle: 'ghostErrorMessageContainer',
    oldValue: '',
    errorState: false,
    value: ''
  };

  componentDidMount() {

    const { type, maxLength } = this.props;
    const { errorMessage } = this.state;
    const textBox = document.getElementById(`TB${this.props.label}`);
  
    if(this.props.initValue===undefined || this.props.initValue===""){
      this.setState(
        {
          value: this.props.value
        });
    }else{
      this.setState(
        {
          value: this.props.initValue
        });
    }
    

    if (type === 'number') {
      textBox.setAttribute(
        'onkeypress',
        'return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13 || event.charCode == 32) ? null : event.charCode >= 48 && event.charCode <= 57'
      );
      if (maxLength) {
        textBox.setAttribute(
          'onKeyDown',
          `if(this.value.length===${this.props.maxLength} && event.keyCode!=8) return false;`
        );
      }
    }
    if (errorMessage) {
      this.setState({
        errorMessage: errorMessage,
        errorStyle: 'errorMessageContainer',
        errorState: true
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initValue !== this.props.initValue) {
      this.setState(
        {
          value: this.props.initValue
        },
        () => {
          this.handleChange(this.state.value);
        }
      );
    }
  }

  handleChange = value => {


    if (this.props.type === 'number') {
      if (/^\d*$/.test(value)) {
        this.setState({
          oldValue: value,
          value: value,
          errorState: false
        });
      } else {
        this.setState(
          {
            errorMessage: 'Please enter numbers only.',
            errorStyle: 'errorMessageContainer',
            value: this.state.oldValue,
            errorState: true
          },
          () => {
            setTimeout(() => {
              this.setState({
                errorMessage: '',
                errorStyle: 'ghostErrorMessageContainer',
                errorState: false
              });
            }, 5000);
          }
        );
      }
    }
    if (this.props.required && !value && !this.state.errorState) {
      this.setState(
        {
          errorMessage: 'This is a required field.',
          errorStyle: 'errorMessageContainer',
          errorState: true,
          value: value
        },
        () => {
          setTimeout(() => {
            this.setState({
              errorMessage: '',
              errorStyle: 'ghostErrorMessageContainer'
            });
          }, 5000);
        }
      );
    } else {
      this.setState({
        value: value
      });
    }
    this.props.onChange(value);
  };

  render() {
    const { label, required, information, placeholder } = this.props;
    const { errorMessage, errorStyle, value } = this.state;
    return (
      <div className='inputGroup'>
        <label className='inputLabel'>
          {label}
          {required && <span className='requiredText'>*</span>}
        </label>
        <div className='inputContainer'>
          <input
            id={`TB${label}`}
            type='text'
            className='inputMain'
            placeholder={placeholder}
            title={placeholder}
            onChange={event => this.handleChange(event.target.value)}
            value={value}
          />
          {information && (
            <div className='addonFunctionContainer'>
              <span className='addonFunction'>i</span>
            </div>
          )}
        </div>
        <div className={errorStyle}>
          <div className='errorMessage'>{errorMessage}</div>
        </div>
      </div>
    );
  }
}

InputText.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  information: PropTypes.bool,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  onTextChange: PropTypes.func
};

InputText.defaultProps = {
  required: false,
  information: false,
  placeholder: '',
  onTextChange: () => {}
};

export default InputText;
