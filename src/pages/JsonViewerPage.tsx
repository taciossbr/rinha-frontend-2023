import React from "react";
import { Text } from "../ui/Typography";

export function JsonViewerPage({ value, filename }) {
  return (
    <div className="json-viewer">
      <div className="page-container">
        <h1 className="subtitle">{filename}</h1>
        <div className="json-container">
          <JsonViewer label="root" className="root" value={value} />
        </div>
      </div>
    </div>
  );
}

function JsonViewer({ value, label, className = "" }) {
  // debugger
  const type = typeof value;
  switch (type) {
    case "number":
      return <NumberComponent value={value} />;
    case "string":
      return <StringComponent value={value} />;
    case "boolean":
      return <BoolComponent value={value} />;
    default:
      if (value == null) return <NullComponent />;
      if (Array.isArray(value))
        return <ListComponent label={label} value={value} />;
      return <ObjectComponent label={label} className={className} value={value} />;
  }
}

function NumberComponent({ value }) {
  return <Text className="number">{value}</Text>;
}

function StringComponent({ value }) {
  return <Text className="string">"{value}"</Text>;
}

function BoolComponent({ value }) {
  return <Text className="bool">{value ? "true" : "false"}</Text>;
}

function NullComponent() {
  return <Text className="null">null</Text>;
}

function ListComponent({ value, label }) {
  return (
    <>
      <Text className="brackets">[</Text>
      <div className="list-content">
        {value.map((element, index) => (
          // TODO eu sei que ta errado
          <div className="item" key={`${label}_${index}`}>
            <Label>{index}: </Label>
            <JsonViewer label={`${label}_${index}`} value={element} />
          </div>
        ))}
      </div>
      <Text className="brackets">]</Text>
    </>
  );
}

function ObjectComponent({ value, label, className }) {
  const keys = Object.keys(value);
  return (
    <>
      <div className={"object-content " + className}>
        {keys.map((jsonKey) => (
          <div className="item" key={`${label}_${jsonKey}`}>
            <Label>{jsonKey}: </Label>
            <JsonViewer label={`${label}_${jsonKey}`} value={value[jsonKey]} />
          </div>
        ))}
      </div>
    </>
  );
}

function Label({ children }) {
  return <Text className="label">{children}</Text>;
}
