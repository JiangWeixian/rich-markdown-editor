import React from 'react'
import RichMarkdownEditor from '../../src'
import './App.css'

const defaultValue = `# Tables

Simple tables with alignment and row/col editing are supported, they can be inserted from the slash menu

| Editor| Rank| React| Collaborative |
|----|----|----|---:|
| Prosemirror| A| No| Yes |
| Slate| B|| No |
| CKEdit| C| No| Yes |
`

function App() {
  return (
    <div className="App">
      <RichMarkdownEditor defaultValue={defaultValue} onChange={(v) => console.log(v())} />
    </div>
  )
}

export default App
