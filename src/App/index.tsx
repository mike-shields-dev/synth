import { useState } from 'react'
import './index.module.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App" data-testid="synth-chassis">
    </div>
  )
}

export default App
