import React, { useState, useEffect } from "react";
import { Form } from "react-redux-form";
import FormInputText from "../FormInputText";
import FormInputSelect from "../FormInputSelect";
import InputCheckbox from "../InputCheckbox";
import InputMask from "../InputMask";


const zipcodeMask = [/\d/, /\d/, /\d/, /\d/, /\d/];

const AddressForm = ({ stateList, homeAddress, model, ischecked }) => {
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {

    const val = sessionStorage.getItem("dropdownvalue");
   
    if(val === undefined){
      console.log ('er')
    } else {
      setState(JSON.parse(val));
    }
   
    
  }, []);

  const toggleHomeAddress = (checkboxState) => {
    if (checkboxState) {
     
      localStorage.setItem("ischecked", true);

      setAddressLine1(homeAddress.addressLine1);
      setAddressLine2(homeAddress.addressLine2);
      setCity(homeAddress.city);
      setState(homeAddress.state);
      setZipCode(homeAddress.zipCode);
    } else {
      setAddressLine1("");
      setAddressLine2("");
      setCity("");
      setState({ label: "", value: "" });
      setZipCode("");
      localStorage.setItem("ischecked", false);
    }
  };

  const handleClick = (value) => {
    sessionStorage.setItem("dropdownvalue", JSON.stringify(value));
  };
 
  return (
    <Form className="formStyle" autoComplete="off" model={model}>
      <InputCheckbox
        label="Billing Address same as Home Address"
        onClick={(checkboxValue) => toggleHomeAddress(checkboxValue)}
        ischecked={ischecked}
      />
      <FormInputText
        label="Address Line 1"
        required
        type="text"
        placeholder="Enter Address Line 1"
        initValue={addressLine1}
        model=".addressLine1"
      />
      <FormInputText
        label="Address Line 2"
        type="text"
        placeholder="Enter Address Line 2 (Optional)"
        initValue={addressLine2}
        model=".addressLine2"
      />
      <FormInputText
        label="City"
        required
        type="text"
        placeholder={`Enter Your City Name`}
        initValue={city}
        model=".city"
      />
      <FormInputSelect
        label="State"
        required
        options={stateList}
        placeholder="Select Your State"
        initialValue={state}
        model=".state"
        onChange={(e) => handleClick(e)}
      />
      <FormInputText
        component={InputMask}
        label="Zip Code"
        required
        type="number"
        placeholder="Enter Your Zip Code"
        initValue={zipCode}
        model=".zipCode"
        maxLength={5}
        mask={zipcodeMask}
      />
    </Form>
  );
};

export default AddressForm;
