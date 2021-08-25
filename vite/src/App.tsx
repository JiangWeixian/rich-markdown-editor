import React from 'react'
import RichMarkdownEditor from '../../src'
import './App.css'

const fixtures = [
  `
Stage | Direct Products | ATP Yields
----: | --------------: | ---------:
Glycolysis | 2 ATP ||
^^ | 2 NADH 3--5 ATP ||
Pyruvaye oxidation | 2 NADH | 5 ATP |
Citric acid cycle | 2 ATP ||
^^ | 6 NADH | 15 ATP |
^^ | 2 FADH2 | 3 ATP |
**30--32** ATP |||
  `,
  `
| Editor| Rank| React| Collaborative |
|----|----|----|---:|
| Prosemirror| A| No| YesNoYes |
| Slate| B||^^|
| CKEdit| C| No|^^|
  `,
  `
Stage | Direct Products | ATP Yields
----: | --------------: | ---------:
Glycolysis | 2 ATP |A|
B | 2 NADH | 3--5 ATP |
Pyruvaye oxidation | 2 NADH | 5 ATP |
Citric acid cycle | 2 ATP |C|
D | 6 NADH | 15 ATP |
F | 2 FADH2 | 3 ATP |
**30--32** ATP |H|I|
  `,
  `
| Stage| Direct Products| ATP Yields |
|---:|---:|---:|
| Glycolysis| 2 ATP| A |
| B| 2 NADH| 3--5 ATP |
| Pyruvaye oxidationCitric acid cycle| 2 NADH2 ATP6 NADH2 FADH2| 5 ATP |
| ^^|^^|C|
| D|^^| 15 ATP |
| F|^^| 3 ATP |
| **30--32** ATP| H| I |
  `
]

const defaultValue = `# Tables

Simple tables with alignment and row/col editing are supported, they can be inserted from the slash menu

${fixtures[3]}
`

function App() {
  return (
    <div className="App">
      <RichMarkdownEditor defaultValue={defaultValue} onChange={(v) => console.log(v())} />
    </div>
  )
}

export default App
