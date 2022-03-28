import React from "react";
import "./Button.css";
import { primary } from "../../theme";

function Button(props) {
  const { label, loading, ...restProps } = props;
  return (
    <button
      className="button"
      disabled={loading}
      type="button"
      style={{ background: primary }}
      {...restProps}
    >
      {label}
    </button>
  );
}

export default Button;
