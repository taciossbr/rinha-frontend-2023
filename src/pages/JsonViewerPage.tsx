import React from "react";
import { Text } from "../ui/Typography";

export function JsonViewerPage({value, filename}) {
  return (
    <div className="json-viewer">
      <div className="page-container">
        <h1 className="subtitle">{filename}</h1>
        <div className="json-container">
          <JsonViewer className="root" value={value} />
        </div>
      </div>
    </div>
  );
}

function JsonViewer({ value, className = "" }) {
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
      if (Array.isArray(value)) return <ListComponent value={value} />;
      return <ObjectComponent className={className} value={value} />;
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

function ListComponent({ value }) {
  return (
    <>
      <Text className="brackets">[</Text>
      <div className="list-content">
        {value.map((element, index) => (
          <div className="item">
            <Label>{index}: </Label>
            <JsonViewer value={element} />
          </div>
        ))}
      </div>
      <Text className="brackets">]</Text>
    </>
  );
}

function ObjectComponent({ value, className }) {
  const keys = Object.keys(value);
  return (
    <>
      <div className={"object-content " + className}>
        {keys.map((key) => (
          <div className="item">
            <Label>{key}: </Label>
            <JsonViewer value={value[key]} />
          </div>
        ))}
      </div>
    </>
  );
}

function Label({ children }) {
  return <Text className="label">{children}</Text>;
}
