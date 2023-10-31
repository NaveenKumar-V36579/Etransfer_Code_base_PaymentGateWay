import React, { Component } from "react";

class InputCheckbox extends Component {
  state = {
    selectionStateCheckboxStyle: this.props.isSelected
      ? "selectedProductCheckbox2"
      : "productCheckbox",
    selectionStateCheckboxContainerStyle: this.props.isSelected
      ? "selectedProductCheckboxContainer2"
      : "productCheckboxContainer"
  };

   componentDidMount() {
    let parent = document.getElementById(`checkbox${this.props.label}`);
    parent.addEventListener("keyup", event => {
      if (event.keyCode === 13 && document.activeElement === parent) {
        this.toggleSelectionStateStyle();
      }
    });

    if(this.props.label==='Billing Address same as Home Address' && this.props.ischecked==='true'){
      ;
      this.props.onClick(true);
     this.toggleSelectionStateStyle();
     }
  }

  toggleSelectionStateStyle = () => {
       if (this.state.selectionStateCheckboxStyle === "productCheckbox") {
      this.setState({
        selectionStateCheckboxStyle: "selectedProductCheckbox2",
        selectionStateCheckboxContainerStyle:
          "selectedProductCheckboxContainer2"
      });
      this.props.onClick(true);
    } else {
      this.setState({
        selectionStateCheckboxStyle: "productCheckbox",
        selectionStateCheckboxContainerStyle: "productCheckboxContainer"
      });
      this.props.onClick(false);
    }
  };

  render() {
    const { label, required, customClass } = this.props;
    const {
      selectionStateCheckboxStyle,
      selectionStateCheckboxContainerStyle
    } = this.state;
    return (
      <div
        className={`checkboxItem mb-4 ${customClass}`}
        onClick={() => this.toggleSelectionStateStyle()}
        tabIndex={0}
        id={`checkbox${label}`}
      >
        <div className={`${selectionStateCheckboxContainerStyle} mr-3`}>
          <img
            src={require(`../../assets/img/checkmark.svg`)}
            className={`${selectionStateCheckboxStyle}`}
            alt={label}
          />
        </div>
        <div className="checkboxLabel">
          {label}
          {required && <span className="requiredText">*</span>}
        </div>
      </div>
    );
  }
}

export default InputCheckbox;
