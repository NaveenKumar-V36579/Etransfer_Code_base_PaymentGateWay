import React from "react";
import DatePicker from "react-datepicker";
import { Form, Control } from "react-redux-form";
import { addDays, getDate } from "date-fns";

const DraftDate = ({model, handleChange}) => {
  const isExcludedDate = (date) => {
    const day = getDate(date);
    return day !== 29 && day !== 30 && day !== 31;
  };

  return (
    <Form className="formStyle" autoComplete="off" model={model}>
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
            onChange = {handleChange}
            mapProps={{
              onChange: (props) => props.onChange,
              selected: (props) => props.modelValue,
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

export default DraftDate;
