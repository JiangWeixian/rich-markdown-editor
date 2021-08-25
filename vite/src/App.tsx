import React from 'react'
import './App.css'
import RichMarkdownEditor from '../../src'

const defaultValue = `
|   |   |   |
|----|----|----|
|   |   |   |
|   |   |   |
`

function App() {

  return (
    <div className="App">
      <RichMarkdownEditor defaultValue={defaultValue} />
    </div>
  )
}

export default App
