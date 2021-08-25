import React from 'react'
import './App.css'
import RichMarkdownEditor from '../../src'

const defaultValue = `
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
|^^|2 NADH|3--5 ATP|
|Pyruvaye oxidation|2 NADH|5 ATP|
|Citric acid cycle|2 ATP||
|^^|6 NADH15 ATP2 FADH23 ATP||
|**30--32** ATP|||
`

function App() {

  return (
    <div className="App">
      <RichMarkdownEditor defaultValue={defaultValue} onChange={v => console.log(v())} />
    </div>
  )
}

export default App
