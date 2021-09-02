import React, { useEffect, useState } from "react";
import "./App.css";
import RichMarkdownEditor from "../../src";

const defaultValue = `
\

|Stage|Direct Products|ATP Yields|
|---:|---:|---:|
|Glycolysis|2 ATP||
|^^|{yellow}(2 NADH)3--5 ATP2 NADH5 ATP||
|Pyruvaye oxidation|^^||

\

|Stage|Direct Products|ATP Yields|
|---:|---:|---:|
|Glycolysis|2 ATP||
|^^|{yellow}(2 NADH)3--5 ATP2 NADH5 ATP||
|Pyruvaye oxidation|^^||

\

Stage | Direct Products | ATP Yields
----: | --------------: | ---------:
Glycolysis | 2 ATP ||
^^ | 2 NADH | 3--5 ATP |
Pyruvaye oxidation | 2 NADH | 5 ATP |
Citric acid cycle | 2 ATP ||
^^ | 6 NADH | 15 ATP |
^^ | 2 FADH2 | 3 ATP |
**30--32** ATP |||

\


|Stage|Direct Products|ATP Yields|
|---:|---:|---:|
|Glycolysis|2 ATP||
|^^|2 NADH3--5 ATP2 NADH5 ATP||
|Pyruvaye oxidation|^^||
|Citric acid cycle|2 ATP||
|^^|6 NADH|15 ATP|
|^^|2 FADH2|3 ATP|
|**30--32** ATP|||

\

|Stage|Direct Products|ATP Yields|
|---:|---:|---:|
|Glycolysis|2 ATP||
|^^|2 NADH3--5 ATP2 NADH5 ATP||
|Pyruvaye oxidation|^^||
|Citric acid cycle|2 ATP||
|^^|6 NADH|15 ATP|
|^^|2 FADH2|3 ATP|
|**30--32** ATP|||

`;

function App() {
  const [value, setValue] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setValue(defaultValue);
    }, 1000);
  }, []);
  return (
    <div className="App">
      <RichMarkdownEditor value={value} onChange={v => console.log(v())} />
    </div>
  );
}

export default App;
