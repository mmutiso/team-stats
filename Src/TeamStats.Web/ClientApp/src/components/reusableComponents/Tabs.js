import React from "react";
import "./Tabs.css";

function Tabs(props) {
  const { tabs, ...restProps } = props;
  return (
    <div className="tabs" {...restProps}>
      {tabs.map((x) => (
        <div className="tab">
          <div className="tabIcon">{x.icon}</div>
          {x.label && <div className="tabLabel">{x.label}</div>}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
