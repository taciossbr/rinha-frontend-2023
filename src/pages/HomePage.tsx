import React from "react";
import { Subtitle, Text, Title } from "../ui/Typography";

export function HomePage({ onChange, error }) {
  function handleChange(event) {
    onChange(event.target.files[0]);
  }

  return (
    <div className="homepage">
      <Title>JSON Tree Viewer</Title>
      <Subtitle>
        Simple JSON Viewer that runs completely on-client. No data exchange{" "}
      </Subtitle>
      <label className="button">
        <input type="file" onChange={handleChange} />
        Load JSON
      </label>
      {error && <Text className="invalid">Invalid file. Please load a valid JSON file.</Text>}
    </div>
  );
}
