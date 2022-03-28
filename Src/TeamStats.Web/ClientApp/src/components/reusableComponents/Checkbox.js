import React from "react";
import "./Checkbox.css";

function Checkbox(props) {
  const { name, value, checked, ...restProps } = props;

  return (
    <div className="checkbox__container">
      <input
        type="checkbox"
        name={name}
        value={value}
        defaultChecked={checked}
        {...restProps}
      />
    </div>
  );
}

export default Checkbox;
