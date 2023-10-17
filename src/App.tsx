import React, { useState } from "react";
import { HomePage } from "./pages/HomePage";
import { JsonViewerPage } from "./pages/JsonViewerPage";

export function App() {
  const [filename, setFilename] = useState("");
  const [error, setError] = useState(false);
  const [state, setState] = useState<any>(null);
  const [fileLoaded, setFileLoaded] = useState(false);

  async function handleChange(file) {
    try {
      // debugger
      const text = await file.text();
      const json = JSON.parse(text);
      setState(json);
      setFilename(file.name);
      setFileLoaded(true);
    } catch {
      setFileLoaded(false);
      setError(true);
    }
  }
  return fileLoaded ? (
    <JsonViewerPage value={state} filename={filename}/>
  ) : (
    <HomePage onChange={handleChange} error={error} />
  );
}
