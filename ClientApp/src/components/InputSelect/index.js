import React, { Component } from 'react';
import Select from 'react-select';

class InputSelect extends Component {
  state = {
    value: null
  };

  componentDidMount(){
 
    this.setState(
      {
        value: this.props.initialValue===undefined?this.props.value:this.props.initialValue
      });
  }

  componentDidUpdate(prevProps) {
 
    if (prevProps.initialValue !== this.props.initialValue) {
      this.setState(
        {
          value: this.props.initialValue  
        },
        () => {
          this.handleChange(this.state.value);
        }
      );
    }
  }

  
  handleChange = selectedOption => {
    this.setState({ value: selectedOption });
    this.props.onChange(selectedOption);
  };

  render() {
    const {
      label,
      required,
      options,
      placeholder,
      customClass,
      elementId
    } = this.props;

    return (
      <div className={`inputGroup ${customClass}`}>
        <label className='inputLabel'>
          {label}
          {required && <span className='requiredText'>*</span>}
        </label>
        <div className='inputSelectContainer'>
          <Select
            options={options}
            classNamePrefix='react-select'
            id={elementId}
            placeholder={placeholder}
            onChange={option => this.handleChange(option)}
            value={this.state.value}
            styles={{
              menu: styles => Object.assign(styles, { zIndex: 999 })
            }}
          />
        </div>
      </div>
    );
  }
}

export default InputSelect;
