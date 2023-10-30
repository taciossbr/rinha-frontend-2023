import React, { useEffect, useState } from "react";
import { HomePage } from "./pages/HomePage";
import { JsonViewerPage } from "./pages/JsonViewerPage";

const PAGE_SIZE = 100;

function spliceJson(json: any[] | any, page: number) {
  if (Array.isArray(json)) {
    return json.slice(0, page * PAGE_SIZE);
  } else {
    return Object.keys(json)
      .slice(0, page * PAGE_SIZE)
      .reduce((acc, key) => ({ ...acc, [key]: json[key] }), {});
  }
}

export function App() {
  const [filename, setFilename] = useState("");
  const [error, setError] = useState(false);
  const [state, setState] = useState<any>(null);
  const [fullJson, setFullJson] = useState<any>(null);
  const [fileLoaded, setFileLoaded] = useState(false);
  const [page, setPage] = useState(1);

  console.log({ page });

  useEffect(() => {
    let tid: number;
    function handleScroll() {
      if (tid) clearTimeout(tid);
      function handle() {
        console.log(
          window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight
        );
        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight
        ) {
          // console.log('end', page)
          setPage(page + 1);
        }
      }
      tid = setTimeout(handle, 100);
    }
    // @ts-ignore
    window.addEventListener("scroll", handleScroll);
    // @ts-ignore
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  useEffect(() => {
    // function handle() {
    if (fileLoaded) {
      console.log("loading");
      setState(spliceJson(fullJson, page));
      // if (Array.isArray(fullJson)) {
      //   setState(fullJson.slice(0, page * PAGE_SIZE));
      // } else {
      //   setState(
      //     Object.keys(fullJson)
      //       .slice(0, page * PAGE_SIZE)
      //       .reduce((acc, key) => ({ ...acc, [key]: fullJson[key] }), {})
      //   );
      // }
    }
    // }
    // const timeout = setTimeout(handle, 100);
    // return () => clearTimeout(timeout);
  }, [fullJson, page]);

  async function handleChange(file) {
    try {
      // debugger
      const text = await file.text();
      // TODO typing
      const json: any[] = JSON.parse(text);
      setFullJson(json);
      setFilename(file.name);
      setFileLoaded(true);
    } catch (err) {
      console.log(err);
      setFileLoaded(false);
      setError(true);
    }
  }
  return fileLoaded ? (
    <JsonViewerPage value={state} filename={filename} />
  ) : (
    <HomePage onChange={handleChange} error={error} />
  );
}
