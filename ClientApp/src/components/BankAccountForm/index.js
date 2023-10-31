import React from "react";
import DatePicker from "react-datepicker";
import ReactTooltip from "react-tooltip";
import { addDays, getDate } from "date-fns";
import FormInputText from "../FormInputText";
import FormInputSelect from "../FormInputSelect";
import { Form, Control } from "react-redux-form";
import InputMask from "../InputMask";

const BankAccountForm = ({ typeOptions, stateList, model }) => {
  const isExcludedDate = date => {
    const day = getDate(date);
    return day !== 29 && day !== 30 && day !== 31;
  };

  const accountNumberMask = [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  const routingNumberMask = [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  const zipcodeMask = [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  return (
    <Form className="formStyle" autoComplete="off" model={model}>
      <ReactTooltip effect="solid" />
      <FormInputText
        label="Account Holder's Name"
        required
        type="text"
        placeholder="Enter Your Name"
        model=".bankHolderName"
      />
      <FormInputSelect
        label="Account Type"
        required
        options={typeOptions}
        placeholder="Select Account Type"
        model=".accountType"
      />
      <FormInputText
        component={InputMask}
        label="Account Number"
        required
        type="number"
        placeholder="Enter Your Account Number"
        model=".accountNumber"
        minLength={3}
        maxLength={17}
        mask={accountNumberMask}
      />
      <FormInputText
        component={InputMask}
        label="Routing Number"
        required
        type="number"
        placeholder="Enter Your Routing Number"
        model=".routingNumber"
        maxLength={9}
        mask={routingNumberMask}
      />
      <FormInputText
        label="Bank's Name"
        required
        type="text"
        placeholder="Enter the Name on Your Bank"
        elementId="bank-Name"
        model=".bankName"
      />
      <FormInputText
        label="City"
        required
        type="text"
        placeholder="Enter the Name of the City Your Bank is Situated In."
        elementId="bank-City"
        model=".address.bankCity"
      />
      <FormInputSelect
        label="State"
        required
        options={stateList}
        placeholder="Select the State In Which Your Bank is Operating In"
        model=".address.bankState"
      />
      <FormInputText
        component={InputMask}
        label="Zip Code"
        required
        type="number"
        placeholder="Enter Your Bank Branch's Zip Code"
        maxLength={5}
        model=".address.bankZipCode"
        mask={zipcodeMask}
      />
      <div className="display">
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
            model=".bankDraftDate"
            mapProps={{
              onChange: props => props.onChange,
              selected: props => props.modelValue
            }}
            placeholderText="Select a Draft Date"
          />
          <div
            className="addonFunctionContainer ml-1"
            data-tip="Any day within 30 days from today except today, the 29th, 30th, and 31st of the Month."
          >
            <span className="addonFunction">i</span>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default BankAccountForm;
