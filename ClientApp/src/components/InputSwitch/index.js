import React from "react";

const InputSwitch = ({ label, onClick, required, customClass }) => {
  return (
    <div
      className={`switchItem mb-4 ${customClass}`}
      aria-label={label}
      onClick={() => onClick}
    >
      <div className="switchLabel">
        {label}
        {required && <span className="requiredText">*</span>}
      </div>
      <input type="checkbox" className="switch" onClick={() => onClick} />
    </div>
  );
};

export default InputSwitch;
