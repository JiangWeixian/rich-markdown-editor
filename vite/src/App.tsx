import React from 'react'
import RichMarkdownEditor from '../../src/index'

const defaultValue = `# Welcome

Just an easy to use **Markdown** editor with \`slash commands\`

{red}(sample)

`;

function App() {
  return (
    <div className="App">
      <RichMarkdownEditor defaultValue={defaultValue} />
    </div>
  )
}

export default App
