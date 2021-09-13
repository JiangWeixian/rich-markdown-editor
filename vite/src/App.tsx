import React, { useEffect, useState } from "react";
import "./App.css";
import RichMarkdownEditor from "../../src";

const defaultValue = `
\

|Stage|Direct Products||
|---:|---:|---:|
|Glycolysis|2 ATP||
|^^|{yellow}(2 NADH)3--5 ATP2 NADH5 ATP||
|Pyruvaye oxidation|^^||

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
      <RichMarkdownEditor
        value={value}
        onChange={v => console.log(v())}
        enableStickBar={true}
      />
    </div>
  );
}

export default App;
