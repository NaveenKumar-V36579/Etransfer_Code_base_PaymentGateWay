import React from "react";
import DatePicker from "react-datepicker";
import ReactTooltip from "react-tooltip";
import { addDays, getDate } from "date-fns";
import FormInputText from "../FormInputText";
import FormInputSelect from "../FormInputSelect";
import { Form, Control } from "react-redux-form";
import InputMask from "../InputMask";

const CardForm = ({ type, typeOptions, years, months, model }) => {
  const isExcludedDate = date => {
    const day = getDate(date);
    return day !== 29 && day !== 30 && day !== 31;
  };

  const creditCardMask = [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];
  return (
    <Form className="formStyle" autoComplete="off" model={model}>
      <ReactTooltip effect="solid" />
      <FormInputSelect
        label={`${type} Card Type`}
        required
        options={typeOptions}
        placeholder={`Select ${type} Card Type`}
        model=".cardType"
      />
      <Control
        component={InputMask}
        label={`${type} Card Number`}
        required
        type="text"
        placeholder={`Enter ${type} Card Number`}
        model=".cardNumber"
        maxLength={20}
        mask={creditCardMask}
      />
      <FormInputText
        label="Name on Card"
        required
        type="text"
        placeholder={`Enter the Name on Your ${type} Card`}
        model=".cardName"
      />
      <div>
        <label className="inputLabel">
          Card Expiration
          <span className="requiredText">*</span>
        </label>
        <div className="inputExpirationDate">
          <div className="rowElements">
            <FormInputSelect
              label="Month"
              required
              options={months}
              placeholder="Select Month"
              model=".month"
            />
          </div>
          <div className="rowElements">
            <FormInputSelect
              label="Year"
              required
              options={years}
              placeholder="Select Year"
              model=".year"
            />
          </div>
        </div>
      </div>
      <FormInputText
        label="Card Verification Number"
        required
        type="number"
        placeholder="Enter Card Verification Number"
        maxLength={3}
        model=".cvv"
      />
      <div>
        <label className="inputLabel">
          Draft Date
          <span className="requiredText">*</span>
        </label>
        <div className="inputDatePickerRow">
          <Control
            component={DatePicker}
            className="form-control"
            minDate={addDays(new Date(), 1)}
            maxDate={addDays(new Date(), 30)}
            filterDate={isExcludedDate}
            dateFormat="MM/dd/yyyy"
            model=".draftDate"
            mapProps={{
              onChange: props => props.onChange,
              selected: props => props.modelValue
            }}
            placeholderText="Select a Draft Date"
          />
          <div
            className="addonFunctionContainer ml-1"
            data-tip="Draft Date must be valid date between tomorrow and 30 days from tomorrow and must not be the 29th, 30th, or 31st of the month."
          >
            <span className="addonFunction">i</span>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default CardForm;
