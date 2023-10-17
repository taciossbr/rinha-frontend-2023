import React from "react";

export function Button({ children, className = "" }) {
  return <button className={"button " + className}>{children}</button>;
}
