import React from "react";

export function Text({ children, className = "" }) {
  return <div className={"text " + className}>{children}</div>;
}

export function Title({ children, className = "" }) {
  return <h1 className={"title " + className}>{children}</h1>;
}

export function Subtitle({ children, className = "" }) {
  return <h2 className={"subtitle " + className}>{children}</h2>;
}
