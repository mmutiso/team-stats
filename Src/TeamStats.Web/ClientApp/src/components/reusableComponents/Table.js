import React from "react";
import "./Table.css";
import Checkbox from "./Checkbox";

function Table(props) {
  const {
    headers,
    data,
    name,
    value,
    checkbox,
    selectedPlayers,
    handleClick,
    ...restProps
  } = props;
  return (
    <table {...restProps}>
      <thead>
        <tr>
          {headers.map((x, i) => (
            <th key={i}>{x}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((x) => {
          const selected = selectedPlayers?.indexOf(x) !== -1;

          return (
            <tr
              key={x.id}
              onClick={(e) => {
                handleClick(x);
                console.log(e.target);
              }}
            >
              <td>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {x.name}
                  {checkbox && (
                    <Checkbox
                      style={{ marginLeft: "auto" }}
                      value={x.name}
                      name={x.name}
                      onClick={() => handleClick(x)}
                      checked={selected}
                    />
                  )}
                </div>
              </td>
              {x.count && <td>{x.count}</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
